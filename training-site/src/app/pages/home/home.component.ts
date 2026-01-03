import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  // Featured videos disabled - will be enabled when videos are ready
  // featured: ReturnType<VideoService['getFeatured']> = [];
  
  displayLines: string[] = ['', '', '', '', '', ''];
  currentLine = 0;
  private codeLines = [
    '// Build amazing full-stack apps',
    'const app = new MANStack();',
    'app.learn(\'Angular\')',
    '  .with(\'Node.js\')',
    '  .useDatabase(\'MongoDB\');',
    'await app.deploy();'
  ];
  private currentChar = 0;
  private typingInterval: any;
  
  curriculumItems = [
    'Web Basics',
    'Angular Fundamentals',
    'API Development with Node',
    'Database with MongoDB',
    'Full-Stack Mini Project',
    'Interview Preparation'
  ];

  constructor(
    private videoService: VideoService, 
    private seo: SeoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Video service commented out - enable when videos are ready
    // this.featured = this.videoService.getFeatured();
    this.seo.set('MEAN Stack Training – Angular Node.js MongoDB', 'Project-based MEAN stack training covering Angular, Node.js, Express, and MongoDB with interview preparation.');
  }

  ngAfterViewInit() {
    // Start typing after view is fully initialized
    setTimeout(() => {
      this.startTyping();
    }, 0);
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private startTyping() {
    const typingSpeed = 60;
    const pauseAtEnd = 2000;
    
    this.typingInterval = setInterval(() => {
      if (this.currentLine < this.codeLines.length) {
        if (this.currentChar < this.codeLines[this.currentLine].length) {
          this.displayLines[this.currentLine] += this.codeLines[this.currentLine].charAt(this.currentChar);
          this.currentChar++;
          this.cdr.detectChanges();
        } else {
          this.currentLine++;
          this.currentChar = 0;
          this.cdr.detectChanges();
        }
      } else {
        clearInterval(this.typingInterval);
        setTimeout(() => {
          this.displayLines = ['', '', '', '', '', ''];
          this.currentLine = 0;
          this.currentChar = 0;
          this.cdr.detectChanges();
          this.startTyping();
        }, pauseAtEnd);
      }
    }, typingSpeed);
  }

  getIcon(index: number): string {
    const icons = ['📚', '⚡', '🔌', '🗄️', '🏗️', '💼'];
    return icons[index] || '✨';
  }
}


