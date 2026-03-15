import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled = false;
  showDropdown = signal(false);
  mobileOpen = false;
  private dropdownTimer: any = null;

  constructor(public theme: ThemeService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  openDropdown() {
    clearTimeout(this.dropdownTimer);
    this.showDropdown.set(true);
  }

  closeDropdown() {
    this.dropdownTimer = setTimeout(() => {
      this.showDropdown.set(false);
    }, 150);
  }

  toggleTheme() {
    this.theme.toggle();
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
  }

  closeMobile() {
    this.mobileOpen = false;
    document.body.style.overflow = '';
  }
}
