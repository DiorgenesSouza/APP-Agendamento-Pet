import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(), // Deixe assim, sem o "eventCoalescing" ou remova se necessário
    provideRouter(routes),
    provideHttpClient()
  ]
};