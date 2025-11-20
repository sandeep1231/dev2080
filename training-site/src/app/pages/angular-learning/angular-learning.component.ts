import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-angular-learning',
  imports: [CommonModule, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './angular-learning.component.html',
  styleUrl: './angular-learning.component.scss',
})
export class AngularLearningComponent {
  videos: ReturnType<VideoService['getByTopic']> = [];
  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    this.videos = this.videoService.getByTopic('angular');
    this.seo.set('Angular Training – Components, Routing & Basics', 'Learn Angular fundamentals: components, data binding, directives, routing, and services.');
  }
}
