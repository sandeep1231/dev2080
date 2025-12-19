import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-join',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-join.component.html',
  styleUrl: './contact-join.component.scss',
})
export class ContactJoinComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) return;
    
    // Prepare WhatsApp message
    const name = this.form.value.name;
    const email = this.form.value.email;
    const message = this.form.value.message || '';
    
    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
    const whatsappNumber = '919778177995';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.form.reset();
  }
}
