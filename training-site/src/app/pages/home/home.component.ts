import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, SafeUrlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Featured videos disabled - will be enabled when videos are ready
  // featured: ReturnType<VideoService['getFeatured']> = [];
  
  curriculumItems = [
    'Web Basics',
    'Angular Fundamentals',
    'API Development with Node',
    'Database with MongoDB',
    'Full-Stack Mini Project',
    'Interview Preparation'
  ];

  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    // Video service commented out - enable when videos are ready
    // this.featured = this.videoService.getFeatured();
    this.seo.set('MEAN Stack Training – Angular Node.js MongoDB', 'Project-based MEAN stack training covering Angular, Node.js, Express, and MongoDB with interview preparation.');
  }

  getIcon(index: number): string {
    const icons = ['📚', '⚡', '🔌', '🗄️', '🏗️', '💼'];
    return icons[index] || '✨';
  }
}


