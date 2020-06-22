import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';

import { ChartModule } from 'primeng/chart';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { PrebootModule } from 'preboot';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'hackerNewsClone' }),
    BrowserTransferStateModule,
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
