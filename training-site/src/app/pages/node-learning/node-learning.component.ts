import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-node-learning',
  imports: [CommonModule, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './node-learning.component.html',
  styleUrl: './node-learning.component.scss',
})
export class NodeLearningComponent {
  videos: ReturnType<VideoService['getByTopic']> = [];
  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    this.videos = this.videoService.getByTopic('node');
    this.seo.set('Node.js Training – APIs & Express Basics', 'Learn Node.js fundamentals: event loop, packages, Express routing, REST APIs, and environment configuration.');
  }
}
