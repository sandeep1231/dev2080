import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { VideoService } from '../../services/video.service';
import { SeoService } from '../../services/seo.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-mongodb-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent, SafeUrlPipe],
  templateUrl: './mongodb-learning.component.html',
  styleUrl: './mongodb-learning.component.scss',
})
export class MongodbLearningComponent {
  // Videos disabled - will be enabled when videos are recorded
  // videos: ReturnType<VideoService['getByTopic']> = [];
  
  expandedMongo: number | null = 0; // First item expanded by default
  
  questions = [
    {
      question: 'What is MongoDB?',
      answer: 'MongoDB is a NoSQL document database. Unlike relational databases with tables, MongoDB stores flexible JSON-like documents in collections. Supports dynamic schemas and horizontal scaling.'
    },
    {
      question: 'What is a document in MongoDB?',
      answer: 'A document is a BSON (Binary JSON) data format similar to JSON objects. Contains key-value pairs with various data types. Similar to a row in relational databases but more flexible.'
    },
    {
      question: 'What is a collection?',
      answer: 'A collection is a group of MongoDB documents. Similar to a table in relational databases but without strict schema. Can contain documents with different structures.'
    },
    {
      question: 'How do you perform CRUD operations?',
      answer: 'Create: insertOne(), insertMany(). Read: find(), findOne(). Update: updateOne(), updateMany(). Delete: deleteOne(), deleteMany(). Each returns a result object with operation details.'
    },
    {
      question: 'What is an index in MongoDB?',
      answer: 'An index improves query performance by creating a sorted reference to field values. Default _id index for primary key. Create indexes on frequently queried fields to speed up searches.'
    },
    {
      question: 'What is the aggregation pipeline?',
      answer: 'A framework for data transformation using stages: $match (filter), $group (aggregate), $sort, $project (select fields), $limit. Build complex analytical queries step by step.'
    },
    {
      question: 'What is Mongoose?',
      answer: 'Mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js. Provides schema validation, middleware hooks, type casting, and OOP patterns for cleaner code.'
    },
    {
      question: 'How do you handle relationships in MongoDB?',
      answer: 'Use embedding (nesting documents) for one-to-few relationships or referencing (storing ObjectIds) for one-to-many. Choose based on query patterns and data size.'
    }
  ];

  constructor(private videoService: VideoService, private seo: SeoService) {}

  ngOnInit() {
    // Video service disabled - uncomment when videos are ready
    // this.videos = this.videoService.getByTopic('mongo');
    this.seo.set('MongoDB Training – NoSQL & Mongoose Basics', 'Learn MongoDB data modeling, CRUD operations, indexes, aggregation pipeline, and Mongoose ODM patterns.');
  }

  toggleMongo(index: number) {
    this.expandedMongo = this.expandedMongo === index ? null : index;
  }
}

