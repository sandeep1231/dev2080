import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

type Kind = 'angular' | 'node' | 'mongo';

@Component({
  selector: 'app-playground',
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
})
export class PlaygroundComponent {
  @Input() kind: Kind = 'angular';

  kindSig = signal<Kind>('angular');

  ngOnChanges() {
    this.kindSig.set(this.kind);
  }

  readonly url = computed(() => {
    const k = this.kindSig();
    switch (k) {
      case 'angular':
        return 'https://stackblitz.com/fork/angular?embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1';
      case 'node':
        return 'https://stackblitz.com/fork/node?embed=1&file=index.js&hideExplorer=1&hideNavigation=1&devtoolsheight=33';
      case 'mongo':
        // Use a Node starter; learners can npm install libs and practice CRUD against mock data or remote APIs.
        return 'https://stackblitz.com/fork/node?embed=1&file=index.js&hideExplorer=1&hideNavigation=1';
    }
  });
}
