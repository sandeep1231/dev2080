import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaygroundComponent } from '../../shared/playground/playground.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-mongodb-learning',
  imports: [CommonModule, RouterLink, PlaygroundComponent],
  templateUrl: './mongodb-learning.component.html',
  styleUrl: './mongodb-learning.component.scss',
})
export class MongodbLearningComponent {
  expandedMongo: number | null = 0;

  curriculum = [
    { title: 'Introduction to NoSQL & MongoDB', description: 'Understand why NoSQL and when to use MongoDB', topics: ['SQL vs NoSQL', 'Document Model', 'BSON Format', 'MongoDB Atlas Setup', 'Compass GUI'] },
    { title: 'CRUD Operations Mastery', description: 'Create, read, update, and delete documents', topics: ['insertOne/Many', 'find & Filters', 'Update Operators', 'deleteOne/Many', 'Bulk Operations'] },
    { title: 'Query Operators & Expressions', description: 'Master MongoDB Query Language (MQL)', topics: ['$gt/$lt/$eq', '$in/$nin', '$and/$or/$not', '$regex', '$exists/$type'] },
    { title: 'Schema Design Patterns', description: 'Design optimal document structures', topics: ['Embedding vs Referencing', 'One-to-Many', 'Many-to-Many', 'Polymorphic Pattern', 'Bucket Pattern'] },
    { title: 'Indexing & Performance', description: 'Optimize query speed and database performance', topics: ['Single-Field Index', 'Compound Index', 'Text Index', 'explain()', 'Performance Advisor'] },
    { title: 'Aggregation Pipeline', description: 'Transform and analyze data with pipelines', topics: ['$match', '$group', '$sort', '$project', '$lookup', '$unwind', '$facet'] },
    { title: 'Mongoose ODM', description: 'Use Mongoose with Node.js for structured data access', topics: ['Schemas & Models', 'Middleware Hooks', 'Virtuals', 'Population', 'Validation'] },
    { title: 'Production & Security', description: 'Deploy and secure MongoDB in production', topics: ['Replica Sets', 'Sharding', 'Authentication', 'Backup & Restore', 'Monitoring'] },
  ];

  questions = [
    { question: 'What is MongoDB?', answer: 'MongoDB is a NoSQL document database storing data as flexible BSON (Binary JSON) documents in collections. Unlike SQL databases with rigid table schemas, MongoDB allows varied document structures, making it ideal for rapid development, horizontal scaling, and evolving data models.' },
    { question: 'What is a document in MongoDB?', answer: 'A document is a BSON data structure similar to JSON objects. Contains key-value pairs supporting various types: strings, numbers, arrays, nested objects, dates, ObjectIds, binary data. Documents have a 16MB size limit. Each has a unique _id field (auto-generated ObjectId by default).' },
    { question: 'What is the difference between embedding and referencing?', answer: 'Embedding: nesting related data within a document (denormalized). Use for one-to-few relationships and data accessed together. Referencing: storing ObjectIds pointing to other documents (normalized). Use for one-to-many, large sub-documents, or data accessed independently. Choose based on query patterns.' },
    { question: 'How do you perform CRUD operations?', answer: 'Create: insertOne({doc}), insertMany([docs]). Read: find({filter}), findOne({filter}). Update: updateOne({filter}, {$set: {field: value}}), updateMany(). Delete: deleteOne({filter}), deleteMany(). All support options like upsert, projection, and sort.' },
    { question: 'What is an index in MongoDB?', answer: 'An index is a data structure (B-tree) that improves query performance by providing quick lookups. Types: single-field, compound (multi-field), text (full-text search), geospatial (2d/2dsphere), hashed, and wildcard. Default _id index exists on every collection. Use createIndex() to create.' },
    { question: 'What is the aggregation pipeline?', answer: 'A framework for data transformation using sequential stages: $match (filter), $group (aggregate), $sort (order), $project (reshape), $lookup (join), $unwind (flatten arrays), $facet (multiple pipelines), $bucket (group by ranges). Each stage transforms and passes documents to the next.' },
    { question: 'What is Mongoose and why use it?', answer: 'Mongoose is an Object Document Mapper (ODM) for MongoDB and Node.js. Benefits: schema validation, type casting, middleware hooks (pre/post save), virtual properties, query builders, population (joining), plugins. Provides structure while retaining MongoDB flexibility.' },
    { question: 'How do you handle relationships in MongoDB?', answer: 'Embedding: nested sub-documents for one-to-few (e.g., user addresses). Referencing: store ObjectIds, populate with Mongoose (one-to-many: e.g., blog posts → comments). Hybrid: embed frequently accessed fields, reference full documents. Use $lookup for server-side joins in aggregation.' },
    { question: 'What are MongoDB transactions?', answer: 'Multi-document ACID transactions ensure atomicity across multiple operations. Use startSession(), startTransaction(), commitTransaction(), abortTransaction(). Required for operations that must succeed or fail together (e.g., money transfer). Available in replica sets and sharded clusters.' },
    { question: 'How does sharding work?', answer: 'Sharding distributes data across multiple servers (horizontal scaling). A shard key determines document placement. Components: mongos (router), config servers (metadata), shard servers (data). Choose shard key based on cardinality, frequency, and monotonicity. Supports range and hashed strategies.' },
    { question: 'What is a replica set?', answer: 'A replica set is a group of mongod instances maintaining the same data for high availability. Contains primary (reads/writes), secondary (replication), and optionally arbiter (voting). Auto failover elects new primary if current fails. Read preference configures where reads go.' },
    { question: 'How do you optimize MongoDB performance?', answer: 'Key strategies: create proper indexes, use explain() to analyze queries, project only needed fields, avoid large $in arrays, use aggregation instead of client-side processing, implement pagination with skip/limit or cursor-based, monitor with Atlas Performance Advisor, and design schemas around query patterns.' },
    { question: 'What is MongoDB Atlas?', answer: 'MongoDB Atlas is a fully managed cloud database service. Features: automated provisioning, scaling, backups, monitoring, security (encryption, IP whitelisting, VPC peering), global clusters, serverless instances, Atlas Search (full-text), and Data API. Supports AWS, Azure, and GCP.' },
    { question: 'How do you secure a MongoDB deployment?', answer: 'Enable authentication (SCRAM-SHA-256), implement role-based access control (RBAC), enable TLS/SSL encryption, configure network access (IP whitelist, VPC), audit logs, encrypt data at rest, use field-level encryption for sensitive data, and keep MongoDB version updated.' },
    { question: 'What are change streams?', answer: 'Change streams let applications listen for real-time data changes in collections, databases, or deployments. Use cases: real-time notifications, cache invalidation, data synchronization, event-driven architectures. Watch for insert, update, delete, replace events. Requires replica set or sharded cluster.' },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set('MongoDB Training India – Complete NoSQL Database Course with AI Tools | Dev2080', 'Master MongoDB: document model, CRUD, aggregation pipeline, Mongoose, Atlas, schema design. 35+ hands-on labs, 15+ interview questions. Best MongoDB training in India.');
  }

  toggleMongo(index: number) {
    this.expandedMongo = this.expandedMongo === index ? null : index;
  }
}
