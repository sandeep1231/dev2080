import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-resources',
  imports: [CommonModule, RouterLink],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set('Developer Resources, Roadmap & Project Ideas | Dev2080', 'Curated learning roadmap, official docs, AI development tools, cheatsheets, and 6+ project ideas for full-stack developers in India.');
  }
}
