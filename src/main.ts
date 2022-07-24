
import { BootstrapModuleFn as Bootstrap, hmr, WebpackModule } from '@ngxs/hmr-plugin';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare const module: WebpackModule;

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
    if (module['hot']) {
        hmr(module, bootstrap, {
            autoClearLogs: true
        }).catch((err: Error) => console.error(err));
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }

} else {
    bootstrap().catch(err => console.error(err));
}
