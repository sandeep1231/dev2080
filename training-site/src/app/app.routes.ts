import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
	{ path: 'angular', loadComponent: () => import('./pages/angular-learning/angular-learning.component').then(m => m.AngularLearningComponent) },
	{ path: 'node', loadComponent: () => import('./pages/node-learning/node-learning.component').then(m => m.NodeLearningComponent) },
	{ path: 'mongodb', loadComponent: () => import('./pages/mongodb-learning/mongodb-learning.component').then(m => m.MongodbLearningComponent) },
	{ path: 'resources', loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent) },
	{ path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
	{ path: 'contact', loadComponent: () => import('./pages/contact-join/contact-join.component').then(m => m.ContactJoinComponent) },
	{ path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
	{ path: 'terms-of-service', loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent) },
	{ path: '**', redirectTo: '' }
];
