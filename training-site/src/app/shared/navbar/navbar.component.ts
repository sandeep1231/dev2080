import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // Collapse the mobile navbar after a navigation link click.
  collapseIfOpen() {
    const nav = document.getElementById('mainNav');
    if (nav && nav.classList.contains('show')) {
      const bootstrapGlobal: any = (window as any).bootstrap;
      if (bootstrapGlobal?.Collapse) {
        const existing = bootstrapGlobal.Collapse.getInstance(nav);
        const instance = existing || new bootstrapGlobal.Collapse(nav, { toggle: false });
        instance.hide();
      } else {
        // Fallback: manually remove show class
        nav.classList.remove('show');
      }
    }
  }

  toggleNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.classList.toggle('show');
  }
}
