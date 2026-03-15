import { Injectable, signal } from '@angular/core';
import { GoogleGenerativeAI, type ChatSession } from '@google/generative-ai';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
}

export interface QuickReply {
  label: string;
  value: string;
}

const SYSTEM_PROMPT = `You are the Dev2080 AI Assistant — a friendly, knowledgeable chatbot embedded on the Dev2080 learning platform website.

IMPORTANT FORMATTING RULES — you MUST follow these:
- Do NOT use any markdown formatting. No **, no *, no #, no bullet lists with -.
- Use plain text only. For emphasis, use CAPS sparingly or quotes.
- For lists, use numbered items (1. 2. 3.) or simple line breaks.
- Keep responses concise: 2-4 short paragraphs max. This is a small chat widget.

## About Dev2080
Dev2080 is a professional technology learning platform that teaches the MEAN stack (MongoDB, Express.js, Angular, Node.js) and modern web development. The name "Dev2080" is based on the Pareto principle — learn the 20% of skills that deliver 80% of results.

Courses offered:
1. Angular Track: Components, signals, RxJS, routing, forms, directives, pipes, services, dependency injection, standalone components, and full-stack integration.
2. Node.js Track: Server-side JavaScript with Express.js, REST APIs, authentication (JWT), middleware, file handling, WebSockets, and deployment.
3. MongoDB Track: Schema design, CRUD operations, aggregation pipelines, indexing, Mongoose ODM, and building database-driven apps.
4. Full MEAN Stack: End-to-end JavaScript development combining all four technologies.

Mode of Coaching / Training Format:
1. Live Online Batches: Instructor-led live sessions via video calls with real-time interaction.
2. Batch-Based Schedule: Training organized in batches with fixed schedules students can pick.
3. Mentorship: Dedicated mentor support, doubt-clearing sessions, and code reviews.
4. Hands-On Projects: Real-world projects like task managers, chat apps, e-commerce platforms.
5. Interactive Playgrounds: Built-in code playgrounds on each learning page, no local setup needed.
6. Self-Paced Resources: Free roadmaps, cheatsheets, tool recommendations, and project ideas.

Pricing: Learning resources and playgrounds are FREE. Live batches with mentorship are paid. Direct users to the "Contact & Join" page for pricing and schedules.

Enrollment: Done through the Contact & Join page where students select track, batch timing, and submit details.

Website pages: Home, Angular/Node.js/MongoDB learning pages (with curriculum + playgrounds), Resources (roadmaps, tools, cheatsheets), Contact & Join (registration + FAQ), About.

Behavior: Be warm, professional, encouraging. Use 1-2 emojis per message. If unsure of specifics, direct to Contact & Join page. Make learning feel approachable for beginners.`;

@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly isOpen = signal(false);
  readonly messages = signal<ChatMessage[]>([]);
  readonly isTyping = signal(false);
  readonly isAIConfigured = signal(false);
  readonly aiStatus = signal<'connected' | 'error' | 'offline'>('offline');
  private nextId = 1;
  private chatSession: ChatSession | null = null;
  private aiAvailable = false;

  readonly quickReplies: QuickReply[] = [
    { label: 'Courses', value: 'What courses do you offer?' },
    { label: 'Get Started', value: 'How do I get started as a beginner?' },
    { label: 'Coaching Mode', value: 'What is the mode of coaching?' },
    { label: 'Resources', value: 'What free resources are available?' },
  ];

  // Comprehensive knowledge base for smart fallback
  private readonly knowledgeBase: { patterns: RegExp[]; reply: string }[] = [
    {
      patterns: [/\b(hello|hi|hey|hii+|good\s*(morning|afternoon|evening))\b/i],
      reply: 'Hey there! 👋 Welcome to Dev2080. I can help you with info about our courses, coaching format, pricing, resources, or how to get started. What would you like to know?'
    },
    {
      patterns: [/\b(mode|coaching|training|format|teach|conduct|class|session|live|online|offline|how.*(learn|teach|train|coach|work))\b/i],
      reply: 'Our coaching is through live online batches! 🎓 Here\'s how it works:\n\n1. Instructor-led live sessions via video calls where you can interact in real time\n2. Batches run on fixed schedules — pick a time that works for you\n3. Each batch includes dedicated mentor support, doubt-clearing sessions, and code reviews\n4. You\'ll build real-world projects like task managers, chat apps, and e-commerce platforms\n5. Plus, our website has interactive playgrounds where you can code right in the browser\n\nVisit the Contact & Join page to see upcoming batch schedules!'
    },
    {
      patterns: [/\b(course|track|offer|curriculum|syllabus|what.*teach|what.*learn|topic|subject|module)\b/i],
      reply: 'We offer comprehensive learning tracks in the MEAN stack! 🚀\n\n1. Angular Track — Components, signals, RxJS, routing, forms, services, dependency injection, and full-stack integration\n2. Node.js Track — Express.js, REST APIs, JWT auth, middleware, WebSockets, and deployment\n3. MongoDB Track — Schema design, CRUD, aggregation pipelines, indexing, and Mongoose\n4. Full MEAN Stack — All four technologies combined with end-to-end projects\n\nEach track includes interactive playgrounds and hands-on projects. Check our learning pages for detailed curriculum!'
    },
    {
      patterns: [/\b(angular)\b/i],
      reply: 'Our Angular track is comprehensive! 🅰️ It covers components, signals, RxJS, routing, reactive forms, template-driven forms, directives, pipes, services, dependency injection, standalone components, and full-stack integration with Node.js and MongoDB.\n\nThe learning page has an interactive playground where you can write and run Angular code right in the browser. Check it out!'
    },
    {
      patterns: [/\b(node\.?js|node\b|backend|server.side|express)\b/i],
      reply: 'The Node.js track teaches everything you need for backend development! 💚 You\'ll learn Express.js, REST API design, JWT authentication, middleware patterns, file handling, real-time features with WebSockets, error handling, and deployment.\n\nIt pairs perfectly with our MongoDB and Angular tracks to build full-stack apps.'
    },
    {
      patterns: [/\b(mongo|mongodb|database|nosql|mongoose)\b/i],
      reply: 'Our MongoDB track covers the essentials of modern database development! 🍃 You\'ll learn schema design, CRUD operations, aggregation pipelines, indexing strategies, Mongoose ODM integration with Node.js, and how to build database-driven applications.\n\nCombine it with Node.js and Angular for a complete full-stack skill set.'
    },
    {
      patterns: [/\b(mean|full.?stack|complete.?stack)\b/i],
      reply: 'The MEAN stack combines MongoDB, Express.js, Angular, and Node.js for end-to-end JavaScript development! 🔗 Our platform covers all four technologies with hands-on projects that bring them together.\n\nYou\'ll build real full-stack applications from database to frontend. Check the Contact & Join page to enroll in a MEAN stack batch!'
    },
    {
      patterns: [/\b(price|cost|fee|charge|pay|afford|budget|free|money|rupee|inr|usd|dollar)\b/i],
      reply: 'Great question about pricing! 💰\n\nThe learning resources on our website — including playgrounds, cheatsheets, roadmaps, and concept explanations — are completely FREE to access.\n\nFor live training batches with instructor-led sessions, mentorship, code reviews, and project guidance, those are paid. Visit our Contact & Join page for current pricing and upcoming batch schedules!'
    },
    {
      patterns: [/\b(contact|join|enroll|register|sign.?up|apply|admission|batch|schedule|timing|when.*start)\b/i],
      reply: 'Ready to join? 🎯 Head over to our Contact & Join page! There you can:\n\n1. Choose your preferred track (Angular, Node.js, MongoDB, or Full MEAN Stack)\n2. Select a batch timing that suits your schedule\n3. Submit your details to register\n\nOur team will get back to you with batch details and next steps.'
    },
    {
      patterns: [/\b(resource|tool|download|cheatsheet|roadmap|reference|material|pdf)\b/i],
      reply: 'Our Resources page is packed with useful stuff! 📚\n\n1. Learning roadmaps for each technology\n2. Recommended tools (VS Code, Postman, MongoDB Compass, etc.)\n3. Quick-reference cheatsheets\n4. Practice project ideas with tech requirements\n5. Curated external links\n\nAll free to access — check it out!'
    },
    {
      patterns: [/\b(project|build|practice|hands.?on|real.?world|portfolio|assignment)\b/i],
      reply: 'We believe in learning by building! 🛠️ Each track includes real-world projects:\n\n1. Task managers and to-do apps\n2. Real-time chat applications\n3. E-commerce platforms\n4. REST API backends\n5. Full-stack MEAN applications\n\nThese projects go great on your portfolio! Check the Resources page for more project ideas.'
    },
    {
      patterns: [/\b(start|begin|beginner|new|fresher|fresh|zero|scratch|no.*experience|first.?time)\b/i],
      reply: 'Welcome! 🎉 Great to have you here. If you\'re starting from scratch, here\'s the recommended path:\n\n1. Start with Angular for frontend development skills\n2. Move to Node.js to learn backend and APIs\n3. Add MongoDB for database knowledge\n\nOr you can jump straight into a complete MEAN stack batch! Our interactive playgrounds let you practice without any local setup. Visit Contact & Join to enroll.'
    },
    {
      patterns: [/\b(playground|code.*editor|try.*code|sandbox|interactive|run.*code|browser.*code)\b/i],
      reply: 'Each learning page has interactive playgrounds where you can write and run code right in your browser! 💻 No local setup or installation required.\n\nTry them out on the Angular, Node.js, or MongoDB learning pages. It\'s a great way to experiment and learn by doing.'
    },
    {
      patterns: [/\b(mentor|doubt|support|help|guidance|teacher|instructor|trainer|faculty)\b/i],
      reply: 'Every live batch comes with dedicated mentor support! 👨‍🏫\n\n1. Instructor-led live sessions with real-time Q&A\n2. Dedicated doubt-clearing sessions\n3. Code reviews on your assignments and projects\n4. Mentor guidance throughout your learning journey\n\nYou\'re never alone in your learning! Join a batch via the Contact & Join page.'
    },
    {
      patterns: [/\b(certificate|certification|completion|credential)\b/i],
      reply: 'For details about certificates and credentials upon completing a training batch, please reach out through our Contact & Join page! 📜 Our team can give you the specifics about what\'s included with each track.'
    },
    {
      patterns: [/\b(job|career|placement|hire|salary|interview|company|opportunity|employ)\b/i],
      reply: 'Learning the MEAN stack opens great career opportunities! 💼 Full-stack JavaScript developers are in high demand. Our training includes real-world projects perfect for your portfolio, which helps in interviews.\n\nFor specific career guidance and placement support details, reach out through the Contact & Join page!'
    },
    {
      patterns: [/\b(duration|how.*long|week|month|hour|time.*take|complete.*course|length)\b/i],
      reply: 'Course duration varies by track and batch schedule. Typically our batches run for a few weeks with sessions multiple times a week. ⏱️\n\nFor exact duration details and upcoming batch schedules, visit the Contact & Join page — our team will share the complete timeline!'
    },
    {
      patterns: [/\b(prerequisite|require|need.*know|before.*join|prior.*knowledge|eligibility)\b/i],
      reply: 'For our Angular, Node.js, and MongoDB tracks, basic knowledge of HTML, CSS, and JavaScript is helpful. 📋\n\nBut don\'t worry if you\'re a complete beginner — our courses start from the fundamentals and build up progressively. The interactive playgrounds are great for getting hands-on practice early on!'
    },
    {
      patterns: [/\b(what.*is|explain|tell.*about|define|describe).*\b(angular|node|mongo|express|mean|javascript|typescript|api|rest)\b/i],
      reply: 'That\'s a great technical question! 🧠 Our learning pages have detailed explanations with interactive examples. Visit the relevant learning page (Angular, Node.js, or MongoDB) for in-depth concept breakdowns, code examples, and playground exercises.\n\nWant me to point you to a specific topic?'
    },
    {
      patterns: [/\b(thank|thanks|thx|appreciate|great|awesome|helpful|perfect|nice)\b/i],
      reply: 'You\'re welcome! 😊 Glad I could help. Feel free to ask anything else — I\'m here for you. Happy coding!'
    },
    {
      patterns: [/\b(bye|goodbye|see.?you|later|take.?care|good.?night)\b/i],
      reply: 'Goodbye! 👋 Best of luck on your learning journey. Come back anytime you have questions. Happy coding!'
    },
    {
      patterns: [/\b(who.*are.*you|what.*are.*you|your.*name|bot|ai|assistant|chatbot)\b/i],
      reply: 'I\'m the Dev2080 AI assistant! 🤖 I\'m here to help you learn about our courses, coaching format, resources, and how to get started on your tech learning journey.\n\nAsk me anything — I\'m happy to help!'
    },
    {
      patterns: [/\b(about|dev2080|devupgrade|platform|website|company|organization)\b/i],
      reply: 'Dev2080 is a professional technology learning platform focused on the MEAN stack and modern web development. 🌟 The name is based on the Pareto principle — master the 20% of skills that deliver 80% of results.\n\nWe offer live online training batches with mentorship, interactive code playgrounds, free learning resources, and real-world project experience. Check out our About page for more details!'
    },
    {
      patterns: [/^(ok|okay|okk+|k|kk|alright|sure|got\s*it|understood|cool|hmm+|ohh*|right|yep|yup|yes|yeah|ya|no|nah|nope|fine|good|great|nice|lol|haha|wow|oh\s*ok)$/i],
      reply: 'Got it! 😊 If you have any questions about our courses, coaching format, or anything else — just ask. I\'m here to help!'
    },
    {
      patterns: [/^(what|how|why|when|where|which|can|do|does|is|are|will|should)\b/i],
      reply: 'I\'d be happy to help! Could you give me a bit more detail? For example, you can ask about:\n\n1. Our courses (Angular, Node.js, MongoDB, MEAN Stack)\n2. Coaching format and batch schedules\n3. Pricing and enrollment\n4. Free resources and playgrounds\n5. Prerequisites or how to get started\n\nWhat would you like to know more about?'
    },
  ];

  constructor() {
    this.initAI();
  }

  private initAI() {
    const apiKey = environment.geminiApiKey;
    if (!apiKey) {
      this.aiAvailable = false;
      this.isAIConfigured.set(false);
      this.aiStatus.set('offline');
      return;
    }
    this.setupGemini(apiKey);
  }

  configureApiKey(apiKey: string) {
    this.setupGemini(apiKey);
    if (this.aiAvailable) {
      this.addBotMessage('AI mode activated! 🚀 I can now answer any question intelligently. Try asking me anything!');
    }
  }

  private setupGemini(apiKey: string) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });
      this.chatSession = model.startChat({ history: [] });
      this.aiAvailable = true;
      this.isAIConfigured.set(true);
      this.aiStatus.set('connected');
    } catch (e) {
      console.warn('Gemini setup failed:', e);
      this.aiAvailable = false;
      this.isAIConfigured.set(false);
      this.aiStatus.set('error');
    }
  }

  toggle() {
    this.isOpen.update(v => !v);
    if (this.isOpen() && this.messages().length === 0) {
      this.addBotMessage('Hi! 👋 I\'m the Dev2080 AI assistant. Ask me anything about our courses, coaching format, tech topics, or how to get started!');
    }
  }

  close() {
    this.isOpen.set(false);
  }

  sendMessage(text: string) {
    if (!text.trim()) return;
    this.messages.update(msgs => [...msgs, {
      id: this.nextId++, text: text.trim(), sender: 'user', timestamp: new Date()
    }]);
    this.generateReply(text.trim());
  }

  private async generateReply(input: string) {
    this.isTyping.set(true);
    try {
      if (this.aiAvailable && this.chatSession) {
        const result = await this.chatSession.sendMessage(input);
        const reply = result.response.text();
        if (reply) {
          this.aiStatus.set('connected');
          this.addBotMessage(reply);
        } else {
          this.addBotMessage(this.smartFallback(input));
        }
      } else {
        this.addBotMessage(this.smartFallback(input));
      }
    } catch (e: any) {
      console.warn('Gemini API error:', e?.message || e);
      // Check for quota / rate limit errors
      if (e?.message?.includes('429') || e?.message?.includes('quota')) {
        this.aiStatus.set('error');
        this.addBotMessage(this.smartFallback(input));
      } else {
        this.addBotMessage(this.smartFallback(input));
      }
    } finally {
      this.isTyping.set(false);
    }
  }

  private smartFallback(input: string): string {
    for (const entry of this.knowledgeBase) {
      if (entry.patterns.some(p => p.test(input))) {
        return entry.reply;
      }
    }
    return 'That\'s a great question! 🤔 I may not have the exact answer right now, but here\'s what I can help with:\n\n1. Our courses — Angular, Node.js, MongoDB, Full MEAN Stack\n2. Coaching format — Live online batches with mentorship\n3. Resources — Free playgrounds, cheatsheets, roadmaps\n4. Getting started — How to enroll and begin learning\n\nYou can also visit our Contact & Join page to speak directly with our team!';
  }

  private addBotMessage(text: string) {
    this.messages.update(msgs => [...msgs, {
      id: this.nextId++, text, sender: 'bot', timestamp: new Date()
    }]);
  }
}
