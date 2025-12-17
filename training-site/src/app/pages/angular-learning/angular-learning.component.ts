import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-angular-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './angular-learning.component.html',
  styleUrl: './angular-learning.component.scss',
})
export class AngularLearningComponent {
  // Videos disabled - will be enabled when videos are recorded
  // videos: ReturnType<VideoService['getByTopic']> = [];
  
  expandedAngular: number | null = 0; // First item expanded by default
  
  questions = [
    {
      question: 'What is a component?',
      answer: 'A component is a reusable UI building block in Angular containing a template (HTML), logic (TypeScript), and styles (CSS/SCSS). Components are the fundamental units of Angular applications.'
    },
    {
      question: 'What is data binding?',
      answer: 'Data binding is a mechanism to synchronize data between the component class and the template. Types include: interpolation {{ }}, property binding [ ], event binding ( ), and two-way binding [( )].'
    },
    {
      question: 'What are directives?',
      answer: 'Directives are markers on DOM elements that tell Angular to attach behavior. Common directives: *ngIf (conditional rendering), *ngFor (looping), *ngSwitch (switch statement), and ngClass (dynamic classes).'
    },
    {
      question: 'What is dependency injection?',
      answer: 'DI is a design pattern for providing dependencies (services) to components without creating them directly. Angular\'s injector manages service instances and provides them where needed.'
    },
    {
      question: 'What is routing in Angular?',
      answer: 'Routing enables navigation between different views/components in a single-page application. Angular Router manages URL changes, lazy-loading modules, and passing route parameters.'
    },
    {
      question: 'What is RxJS used for?',
      answer: 'RxJS is a library for handling asynchronous programming using Observables. It\'s used for HTTP requests, event handling, and stream processing. Operators like map, filter, and pipe transform data streams.'
    },
    {
      question: 'Template-driven vs Reactive forms?',
      answer: 'Template-driven forms are simple and suitable for basic forms, defined in the template. Reactive forms offer more control, testability, and scalability using FormBuilder, suitable for complex forms.'
    },
    {
      question: 'What is change detection?',
      answer: 'Change detection is Angular\'s mechanism to detect when component data changes and update the DOM. Triggered by events, timers, and HTTP requests. ChangeDetectionStrategy.OnPush optimizes performance.'
    }
  ];

  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    // Video service disabled - uncomment when videos are ready
    // this.videos = this.videoService.getByTopic('angular');
    this.seo.set('Angular Training – Components, Routing & Basics', 'Learn Angular fundamentals: components, data binding, directives, routing, and services.');
  }

  toggleAngular(index: number) {
    this.expandedAngular = this.expandedAngular === index ? null : index;
  }
}


