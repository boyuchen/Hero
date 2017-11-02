import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CodeInputModule } from './codeinput/codeinput.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,CodeInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
