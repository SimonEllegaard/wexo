import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {Frontpage} from "./pages/frontpage";

@NgModule({
  declarations: [
    Frontpage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [Frontpage]
})
export class AppModule { }
