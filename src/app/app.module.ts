import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {SmoothToolComponent} from './components/smooth-tool/smooth-tool.component';
import {SmoothToolApplicationComponent} from './components/smooth-tool-application/smooth-tool-application.component';
import {UIAngularComponentsModule} from '@universal-robots/ui-angular-components';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {PATH} from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApproachComponent} from "./components/approach/approach.component";
import {CommonModule} from "@angular/common";

export const httpLoaderFactory = (http: HttpBackend) =>
  new MultiTranslateHttpLoader(http, [
    {prefix: PATH + '/assets/i18n/', suffix: '.json'},
    {prefix: './ui/assets/i18n/', suffix: '.json'},
  ]);

@NgModule({
  declarations: [
    SmoothToolComponent,
    SmoothToolApplicationComponent,
    ApproachComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    UIAngularComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend]},
      useDefaultLang: false,
    })
  ],
  providers: [],
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const smoothtoolComponent = createCustomElement(SmoothToolComponent, {injector: this.injector});
    customElements.define('smooth-robotics-smooth-tools-smooth-tool', smoothtoolComponent);
    const approachComponent = createCustomElement(ApproachComponent, {injector: this.injector});
    customElements.define('smooth-robotics-smooth-tools-approach', approachComponent);
    const smoothtoolapplicationComponent = createCustomElement(SmoothToolApplicationComponent, {injector: this.injector});
    customElements.define('smooth-robotics-smooth-tools-smooth-tool-application', smoothtoolapplicationComponent);
  }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
  registerWorkersWithWebPack() {
    new Worker(new URL('./components/smooth-tool-application/smooth-tool-application.behavior.worker.ts'
      /* webpackChunkName: "smooth-tool-application.worker" */, import.meta.url), {
      name: 'smooth-tool-application',
      type: 'module'
    });
    new Worker(new URL('./components/smooth-tool/smooth-tool.behavior.worker.ts'
      /* webpackChunkName: "smooth-tool.worker" */, import.meta.url), {
      name: 'smooth-tool',
      type: 'module'
    });
    new Worker(new URL('./components/approach/approach.behavior.worker.ts'
      /* webpackChunkName: "approach.worker" */, import.meta.url), {
      name: 'approach',
      type: 'module'
    });
  }
}

