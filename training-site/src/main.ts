import { bootstrapApplication } from '@angular/platform-browser';
// Import Bootstrap JS bundle for navbar collapse (includes Popper)
// Removed Bootstrap JS to reduce bundle size; custom navbar toggler logic implemented.
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
