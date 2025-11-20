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
  featured: ReturnType<VideoService['getFeatured']> = [];
  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    this.featured = this.videoService.getFeatured();
    this.seo.set('MEAN Stack Training – Angular Node.js MongoDB', 'Project-based MEAN stack training covering Angular, Node.js, Express, and MongoDB with interview preparation.');
  }
}
