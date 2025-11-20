import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root-legacy',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('training-site');
}
