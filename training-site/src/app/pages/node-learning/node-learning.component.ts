import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-node-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent],
  templateUrl: './node-learning.component.html',
  styleUrl: './node-learning.component.scss',
})
export class NodeLearningComponent {
  expandedNode: number | null = 0;

  curriculum = [
    { title: 'Node.js Fundamentals', description: 'Understand the runtime and its architecture', topics: ['V8 Engine', 'Event Loop', 'Modules (ESM/CJS)', 'File System', 'Streams & Buffers'] },
    { title: 'NPM & Project Setup', description: 'Master package management and project configuration', topics: ['package.json', 'Semantic Versioning', 'Scripts', 'Lock Files', 'Workspaces'] },
    { title: 'Express.js Mastery', description: 'Build robust web servers and APIs', topics: ['Routing', 'Middleware Chain', 'Error Handling', 'Static Files', 'Template Engines'] },
    { title: 'REST API Design', description: 'Design and build production-grade APIs', topics: ['CRUD Endpoints', 'Validation (Joi/Zod)', 'Pagination', 'Filtering', 'Versioning'] },
    { title: 'Authentication & Security', description: 'Secure your APIs and protect user data', topics: ['JWT Tokens', 'bcrypt', 'CORS', 'Helmet', 'Rate Limiting', 'OAuth2'] },
    { title: 'Database Integration', description: 'Connect and query databases efficiently', topics: ['MongoDB + Mongoose', 'Connection Pooling', 'Transactions', 'Indexing', 'Aggregation'] },
    { title: 'Testing & Debugging', description: 'Write reliable tests for your APIs', topics: ['Jest / Vitest', 'Supertest', 'Mocking', 'Integration Tests', 'Debug Tools'] },
    { title: 'Deployment & DevOps', description: 'Ship to production with confidence', topics: ['Docker', 'PM2', 'CI/CD', 'Environment Config', 'Logging (Winston)'] },
  ];

  questions = [
    { question: 'What is the Node.js event loop?', answer: 'The event loop is the core mechanism enabling non-blocking I/O in Node.js. It processes async callbacks in phases: timers, pending callbacks, idle/prepare, poll, check, and close. Understanding it is crucial for writing performant Node.js applications.' },
    { question: 'What are Express middlewares?', answer: 'Middleware functions have access to request (req), response (res), and next() function. They can modify data, end requests, or pass control. Types: application-level, router-level, error-handling, built-in (express.json), and third-party (cors, helmet).' },
    { question: 'How do you handle errors in Express?', answer: 'Use try/catch in async route handlers, create centralized error-handling middleware with 4 parameters (err, req, res, next), use custom error classes for different HTTP status codes, and implement global unhandledRejection/uncaughtException handlers.' },
    { question: 'What is REST and RESTful API design?', answer: 'REST (Representational State Transfer) is an architectural style for stateless APIs. RESTful design uses HTTP verbs (GET, POST, PUT, DELETE, PATCH), meaningful URLs as resources, proper status codes, JSON responses, and HATEOAS for discoverability.' },
    { question: 'How do you secure a Node.js API?', answer: 'Key practices: JWT for authentication, bcrypt for password hashing, CORS configuration, Helmet for HTTP headers, rate limiting, input validation/sanitization, parameterized queries (prevent injection), HTTPS in production, and environment variables for secrets.' },
    { question: 'What is the difference between require and import?', answer: 'require() is CommonJS (synchronous, dynamic). import/export is ESM (asynchronous, static, tree-shakeable). ESM is the modern standard. Use "type": "module" in package.json for ESM. Most modern projects use ESM with TypeScript.' },
    { question: 'How do you manage environment variables?', answer: 'Use process.env to access variables. The dotenv library loads from .env files. Never commit .env to git. Use different .env files for dev/staging/prod. Validate env vars at startup with libraries like envalid or zod.' },
    { question: 'What are Streams in Node.js?', answer: 'Streams process data chunk by chunk without loading everything into memory. Types: Readable (fs.createReadStream), Writable (fs.createWriteStream), Duplex (net.Socket), Transform (zlib.createGzip). Essential for handling large files and real-time data.' },
    { question: 'How does clustering work in Node.js?', answer: 'Node.js is single-threaded. The cluster module forks worker processes to utilize multiple CPU cores. PM2 provides production clustering with load balancing, zero-downtime restarts, and process monitoring. Worker threads handle CPU-intensive tasks.' },
    { question: 'What is middleware chaining?', answer: 'Middleware functions execute sequentially in the order added with app.use(). Each calls next() to pass control. Use for: logging, authentication, CORS, body parsing, error handling. Order matters — auth middleware before protected routes.' },
    { question: 'How do you implement JWT authentication?', answer: 'User logs in → server verifies credentials → generates JWT with jsonwebtoken.sign() → sends token. Client sends token in Authorization header. Server middleware verifies with jwt.verify(). Implement refresh tokens for security. Store secrets in env vars.' },
    { question: 'What are HTTP status codes?', answer: '1xx: Informational. 2xx: Success (200 OK, 201 Created, 204 No Content). 3xx: Redirect (301, 302, 304). 4xx: Client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable). 5xx: Server error (500, 503).' },
    { question: 'How do you handle file uploads in Node.js?', answer: 'Use multer middleware for multipart/form-data. Configure storage (disk or memory), file size limits, file type filtering. For cloud storage, stream uploads directly to S3/Azure Blob. Always validate file types and implement virus scanning for production.' },
    { question: 'What is the difference between SQL and NoSQL?', answer: 'SQL (PostgreSQL, MySQL): structured schemas, ACID transactions, complex joins, vertical scaling. NoSQL (MongoDB, Redis): flexible schemas, horizontal scaling, denormalized data, eventual consistency. Choose based on data structure, query patterns, and scaling needs.' },
    { question: 'How do you deploy a Node.js app?', answer: 'Containerize with Docker, use PM2 for process management, set up CI/CD (GitHub Actions), configure reverse proxy (Nginx), enable HTTPS, set up logging/monitoring, use health check endpoints. Cloud options: AWS EC2/ECS, Azure App Service, Railway, Render.' },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set('Node.js Training India – Complete Backend Development Course with AI Tools | Dev2080', 'Master Node.js & Express: REST APIs, authentication, database integration, deployment. 40+ hands-on labs, 15+ interview questions. Best Node.js training in India.');
  }

  toggleNode(index: number) {
    this.expandedNode = this.expandedNode === index ? null : index;
  }
}
