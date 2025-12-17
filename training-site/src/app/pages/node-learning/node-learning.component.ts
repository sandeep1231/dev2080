import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-node-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './node-learning.component.html',
  styleUrl: './node-learning.component.scss',
})
export class NodeLearningComponent {
  // Videos disabled - will be enabled when videos are recorded
  // videos: ReturnType<VideoService['getByTopic']> = [];
  
  expandedNode: number | null = 0; // First item expanded by default
  
  questions = [
    {
      question: 'What is the Node.js event loop?',
      answer: 'The event loop is the core mechanism enabling non-blocking I/O in Node.js. It handles async callbacks in phases: timers, pending callbacks, idle/prepare, poll, check, and close.'
    },
    {
      question: 'What are Express middlewares?',
      answer: 'Middleware functions have access to request (req) and response (res) objects. They can modify data, end requests, or pass control to the next middleware using next().'
    },
    {
      question: 'How do you create routes in Express?',
      answer: 'Use app.METHOD(PATH, HANDLER) where METHOD is HTTP verb (get, post, put, delete) and HANDLER is the callback function. Example: app.get(\'/users\', handler)'
    },
    {
      question: 'What is REST?',
      answer: 'Representational State Transfer is an architectural style for stateless APIs. Uses HTTP verbs (GET, POST, PUT, DELETE, PATCH) to perform operations on resources identified by URLs.'
    },
    {
      question: 'How do you manage environment variables?',
      answer: 'Use process.env to access environment variables. For sensitive data, use dotenv library: require(\'dotenv\').config() reads from .env file.'
    },
    {
      question: 'How to connect to MongoDB?',
      answer: 'Use the official MongoDB driver or Mongoose (ODM). Connection string format: mongodb+srv://user:pass@cluster.mongodb.net/dbname. Mongoose provides schema validation and middleware hooks.'
    },
    {
      question: 'What are HTTP status codes?',
      answer: '2xx (success): 200 OK, 201 Created. 3xx (redirect): 301, 302. 4xx (client error): 400, 404, 401. 5xx (server error): 500, 503.'
    },
    {
      question: 'What is package.json?',
      answer: 'Project metadata file listing dependencies, dev dependencies, scripts, version, and other configurations. npm install reads package.json to install dependencies from package-lock.json.'
    }
  ];

  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    // Video service disabled - uncomment when videos are ready
    // this.videos = this.videoService.getByTopic('node');
    this.seo.set('Node.js Training – APIs & Express Basics', 'Learn Node.js fundamentals: event loop, packages, Express routing, REST APIs, and environment configuration.');
  }

  toggleNode(index: number) {
    this.expandedNode = this.expandedNode === index ? null : index;
  }
}

