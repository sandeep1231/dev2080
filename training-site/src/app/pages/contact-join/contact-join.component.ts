import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact-join',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-join.component.html',
  styleUrl: './contact-join.component.scss',
})
export class ContactJoinComponent {
  form: FormGroup;
  expandedFaq: number | null = 0;

  faqs = [
    { question: 'Do I need prior coding experience?', answer: 'Basic HTML/CSS knowledge is recommended. We cover JavaScript and TypeScript from fundamentals, so beginners with basic web knowledge can join. Our curriculum is designed to take you from basics to advanced topics progressively.' },
    { question: 'What is the class schedule?', answer: 'Classes are held every Saturday & Sunday, 2 hours per session. All sessions are recorded, so you can catch up if you miss a class. We also have weekday doubt-clearing slots available.' },
    { question: 'Will I get a certificate?', answer: 'Yes! Upon successful completion of the course and projects, you receive a verified certificate of completion from Dev2080 that you can share on LinkedIn and include in your resume.' },
    { question: 'Is placement assistance provided?', answer: 'We provide comprehensive career support including resume building, mock interviews, LinkedIn optimization, and referrals to our hiring partner network. Over 92% of our graduates secure relevant positions within 3 months.' },
    { question: 'Can I pay in installments?', answer: 'Yes, we offer flexible EMI options. Contact us on WhatsApp to discuss payment plans that work for you. We also offer early-bird discounts for advance enrollment.' },
    { question: 'What tools and software do I need?', answer: 'A laptop with 8GB+ RAM, VS Code (free), Node.js (free), and a stable internet connection. All other tools like MongoDB Atlas, GitHub, and AI assistants have free tiers sufficient for the course.' },
  ];

  constructor(private fb: FormBuilder, private seo: SeoService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      track: [''],
      message: [''],
    });
  }

  ngOnInit() {
    this.seo.set('Enroll Now – Start Your Developer Journey | Dev2080', 'Join the next batch at Dev2080. Live online classes, hands-on projects, career support. Angular, Node.js, MongoDB training in India.');
  }

  get f() { return this.form.controls; }

  toggleFaq(index: number) {
    this.expandedFaq = this.expandedFaq === index ? null : index;
  }

  onSubmit() {
    if (this.form.invalid) return;
    
    const name = this.form.value.name;
    const email = this.form.value.email;
    const track = this.form.value.track || 'Not specified';
    const message = this.form.value.message || '';
    
    const whatsappMessage = `*New Enrollment Inquiry – Dev2080*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Track:* ${encodeURIComponent(track)}%0A*Message:* ${encodeURIComponent(message)}`;
    const whatsappNumber = '919778177995';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    this.form.reset();
  }
}
