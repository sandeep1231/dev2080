import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-mongodb-learning',
  imports: [CommonModule, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './mongodb-learning.component.html',
  styleUrl: './mongodb-learning.component.scss',
})
export class MongodbLearningComponent {
  videos: ReturnType<VideoService['getByTopic']> = [];
  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    this.videos = this.videoService.getByTopic('mongo');
    this.seo.set('MongoDB Training – NoSQL & Mongoose Basics', 'Learn MongoDB data modeling, CRUD operations, indexes, aggregation pipeline, and Mongoose ODM patterns.');
  }
}
