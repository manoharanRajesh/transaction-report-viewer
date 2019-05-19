import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PapaParseModule} from 'ngx-papaparse';
import {FormsModule} from '@angular/forms';
import {IssueFilterPipe} from './pipe/issueFilter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    IssueFilterPipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PapaParseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
