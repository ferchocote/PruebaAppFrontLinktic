import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

// bootstrapApplication(AppComponent)
//   .catch((err) => console.error(err));
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

    const isProduction = true; // Cambia según el entorno
if (isProduction) {
  enableProdMode();
}
