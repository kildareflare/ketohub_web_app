import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule  } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    BrowserModule.withServerTransition({ appId: 'ketohub' }),
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppServerModule { }
