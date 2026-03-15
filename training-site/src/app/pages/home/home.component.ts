import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  activeTab = signal<'with' | 'without'>('with');
  displayLines: string[] = ['', '', '', '', '', ''];
  currentLine = 0;
  private codeLines = [
    '// AI-Powered Development Workflow',
    'const engineer = new Dev2080();',
    'engineer.useAI(\'copilot\', \'chatgpt\');',
    '  .buildProject(\'enterprise-saas\')',
    '  .deployTo(\'production\')',
    '> Career upgraded! 🚀'
  ];
  private currentChar = 0;
  private typingInterval: any;

  constructor(
    private seo: SeoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.seo.set(
      'Dev2080 — Master the 20% That Delivers 80% of Results', 
      'Master the 20% of tech skills that deliver 80% of career results. Angular, Node.js, MongoDB with AI-powered workflows. Live cohort training by a senior consultant with 10+ years experience.'
    );
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
}


