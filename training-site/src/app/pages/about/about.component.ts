import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set(
      'About — Dev2080 | Senior Consultant & Engineering Trainer',
      'Meet the instructor behind Dev2080. 10+ years in enterprise tech — Angular, SAP Spartacus, Node.js, and AI-powered development. Training developers to master the 20% that delivers 80% of results.'
    );
  }
}
