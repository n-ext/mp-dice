import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideNgxMask } from 'ngx-mask';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [provideNgxMask()],
  })
  .catch((err) => console.error(err));
