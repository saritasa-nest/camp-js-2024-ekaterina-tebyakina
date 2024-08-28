import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([baseUrlInterceptor, apiKeyInterceptor, authorizationInterceptor]), withFetch()),
	],
}).catch(err => console.error(err));
