import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'dev2080-theme';
  isDark = signal(false);

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    } else if (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  toggle() {
    const dark = !this.isDark();
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
  }
}
