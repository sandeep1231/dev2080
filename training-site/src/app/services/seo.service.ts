import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  set(titleText: string, description: string) {
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: description });
  }
}
