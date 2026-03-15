import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-angular-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent],
  templateUrl: './angular-learning.component.html',
  styleUrl: './angular-learning.component.scss',
})
export class AngularLearningComponent {
  expandedAngular: number | null = 0;

  curriculum = [
    { title: 'TypeScript Foundations', description: 'Master TypeScript before diving into Angular', topics: ['Types & Interfaces', 'Generics', 'Decorators', 'Utility Types', 'ES6+ Features'] },
    { title: 'Angular Architecture & Setup', description: 'Understand Angular project structure and tooling', topics: ['Angular CLI', 'Standalone Components', 'Project Structure', 'Workspace Config', 'Vite Builder'] },
    { title: 'Components & Templates', description: 'Build reusable UI building blocks', topics: ['Component Lifecycle', 'Input/Output', 'Content Projection', 'View Queries', 'Template Syntax'] },
    { title: 'Signals & Reactivity', description: 'Angular\'s modern state management', topics: ['signal()', 'computed()', 'effect()', 'input()', 'model()', 'output()'] },
    { title: 'Routing & Navigation', description: 'Build multi-page SPAs with lazy loading', topics: ['Route Configuration', 'Guards & Resolvers', 'Lazy Loading', 'Nested Routes', 'Route Params'] },
    { title: 'Forms & Validation', description: 'Handle user input with robust forms', topics: ['Reactive Forms', 'Template-driven Forms', 'Custom Validators', 'Async Validation', 'Dynamic Forms'] },
    { title: 'HTTP & API Integration', description: 'Connect to backends and external APIs', topics: ['HttpClient', 'Interceptors', 'Error Handling', 'Caching', 'Retry Logic'] },
    { title: 'RxJS Essentials', description: 'Asynchronous programming with Observables', topics: ['Observables', 'Operators', 'Subjects', 'Pipes', 'Unsubscription'] },
    { title: 'Testing & Quality', description: 'Write reliable tests for production code', topics: ['Vitest / Jest', 'TestBed', 'Component Testing', 'Service Mocking', 'E2E with Playwright'] },
    { title: 'Performance & Deployment', description: 'Optimize and ship to production', topics: ['Change Detection', 'SSR/SSG', 'Bundle Analysis', 'Docker', 'CI/CD Pipelines'] },
  ];

  questions = [
    { question: 'What is a component in Angular?', answer: 'A component is a reusable UI building block containing a template (HTML), logic (TypeScript), and styles (CSS/SCSS). Components are the fundamental units of Angular applications. In Angular 21, standalone components are the default — no NgModule required.' },
    { question: 'What is data binding and its types?', answer: 'Data binding synchronizes data between the component class and template. Types: interpolation {{ }}, property binding [ ], event binding ( ), and two-way binding [( )] with ngModel. Angular also supports signal-based binding for fine-grained reactivity.' },
    { question: 'What are Angular signals?', answer: 'Signals are Angular\'s new reactivity primitive (v16+). A signal is a wrapper around a value that notifies consumers when the value changes. Use signal() to create, computed() for derived values, and effect() for side effects. Signals replace many RxJS patterns for simpler state management.' },
    { question: 'What is dependency injection in Angular?', answer: 'DI is a design pattern where dependencies (services) are provided to components without creating them directly. Angular\'s hierarchical injector manages service instances. Use @Injectable({ providedIn: \'root\' }) for singleton services or the inject() function for more flexible injection.' },
    { question: 'What are standalone components?', answer: 'Standalone components (default in Angular 21) don\'t require NgModules. They declare their dependencies directly in the imports array of the @Component decorator. This simplifies the architecture and enables better tree-shaking and lazy loading.' },
    { question: 'Explain Angular routing and lazy loading', answer: 'Angular Router maps URLs to components. Lazy loading uses loadComponent() (standalone) or loadChildren() to split code into chunks loaded on demand, improving initial load performance. Route guards (canActivate, canDeactivate) control access.' },
    { question: 'What is RxJS and why is it used in Angular?', answer: 'RxJS is a library for reactive programming using Observables. Angular uses it for HTTP requests, event handling, and async operations. Key operators: map, filter, switchMap, mergeMap, catchError, debounceTime. With signals, many simple RxJS use cases are simplified.' },
    { question: 'Template-driven vs Reactive forms?', answer: 'Template-driven forms are simple, defined in HTML using ngModel — good for simple forms. Reactive forms use FormBuilder/FormGroup in TypeScript — offering more control, testability, dynamic forms, and complex validation. Reactive forms are preferred for enterprise apps.' },
    { question: 'What is change detection in Angular?', answer: 'Change detection checks when component data changes and updates the DOM. Default strategy checks the entire component tree. OnPush strategy only checks when inputs change or events fire. Signals enable even more fine-grained updates without zone.js overhead.' },
    { question: 'What are Angular interceptors?', answer: 'HTTP interceptors are middleware that intercept and modify HTTP requests/responses. Common uses: adding auth tokens, logging, error handling, caching, and retry logic. Use withInterceptors() in provideHttpClient() for functional interceptors.' },
    { question: 'Explain Angular lifecycle hooks', answer: 'Lifecycle hooks let you tap into component events: constructor (DI), ngOnInit (initialization), ngOnChanges (input changes), ngAfterViewInit (view ready), ngOnDestroy (cleanup). Angular 21 also offers afterNextRender() and afterRender() for DOM operations.' },
    { question: 'What is Angular Universal / SSR?', answer: 'Angular Universal enables Server-Side Rendering (SSR) — rendering pages on the server for better SEO and faster initial page loads. Angular 21 uses @angular/ssr with hydration for seamless client-side takeover after server rendering.' },
    { question: 'How does Angular handle security?', answer: 'Angular has built-in XSS protection via automatic sanitization of HTML, styles, and URLs. It supports Content Security Policy (CSP), CSRF protection with HttpClient, and route guards for authorization. Never use bypassSecurityTrust* unless absolutely necessary.' },
    { question: 'What are deferrable views?', answer: 'Deferrable views (@defer) let you lazy-load parts of a template based on triggers: on viewport, on interaction, on idle, on timer, or on hover. This dramatically improves initial load performance by deferring heavy components until needed.' },
    { question: 'What is the new control flow syntax?', answer: 'Angular 17+ introduced built-in control flow: @if/@else, @for (with track), @switch/@case replacing *ngIf, *ngFor, *ngSwitch directives. The new syntax is more performant, supports type narrowing, and doesn\'t require directive imports.' },
    { question: 'How to optimize Angular performance?', answer: 'Key strategies: OnPush change detection, lazy loading routes, @defer for components, trackBy in loops, pure pipes, Web Workers for CPU tasks, bundle analysis, image optimization with NgOptimizedImage, and server-side rendering (SSR).' },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set('Angular Training India – Complete Angular 21 Course with AI Tools | Dev2080', 'Master Angular 21: standalone components, signals, routing, forms, RxJS, SSR, and AI-powered development. 50+ hands-on labs, 15+ interview questions. Best Angular training in India.');
  }

  toggleAngular(index: number) {
    this.expandedAngular = this.expandedAngular === index ? null : index;
  }
}

