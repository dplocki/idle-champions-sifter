import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueryInputComponent } from './query-input/query-input.component';
import { QueryResultsComponent } from './query-results/query-results.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryInputComponent,
    QueryResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
