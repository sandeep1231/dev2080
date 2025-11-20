import { Injectable } from '@angular/core';

export interface VideoMeta {
  id: string; // YouTube video ID
  title: string;
  description?: string;
  topic: 'angular' | 'node' | 'mongo' | 'featured';
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  private videos: VideoMeta[] = [
    { id: '2OHbjep_WjQ', title: 'Angular Basics', description: 'Project setup, components, data binding.', topic: 'angular' },
    { id: 'k5E2AVpwsko', title: 'Routing & Services', description: 'Routing, services, HTTP patterns.', topic: 'angular' },
    { id: 'TlB_eWDSMt4', title: 'Node.js Intro', description: 'Event loop and runtime overview.', topic: 'node' },
    { id: 'L72fhGm1tfE', title: 'Express Routes', description: 'REST API basics with Express.', topic: 'node' },
    { id: '9z2BunfoZ5Y', title: 'MongoDB Basics', description: 'Documents, collections, CRUD.', topic: 'mongo' },
    { id: 'fevGQe9V4NI', title: 'Mongoose Tutorial', description: 'Schemas, models, validation.', topic: 'mongo' },
    { id: 'dQw4w9WgXcQ', title: 'Sample Training Intro', description: 'Overview of the MEAN stack course.', topic: 'featured' }
  ];

  getByTopic(topic: VideoMeta['topic']) {
    return this.videos.filter(v => v.topic === topic);
  }

  getFeatured() { return this.getByTopic('featured'); }
}
