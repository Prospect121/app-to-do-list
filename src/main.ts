import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
    ModalController,
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig(getApp());
      // remoteConfig.settings.minimumFetchIntervalMillis = 50;
      // remoteConfig.defaultConfig = {
      //   hide_actions: false,
      // };
      return remoteConfig;
    }),
  ],
});
