import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'; // Importation des données de localisation pour le français


registerSwiperElements();

registerLocaleData(localeFr);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  

  