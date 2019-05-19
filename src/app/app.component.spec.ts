import {async, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IssueFilterPipe } from './pipe/issueFilter.pipe';
import { Papa } from 'ngx-papaparse';
import {FormsModule} from '@angular/forms';
import anything = jasmine.anything;


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [Papa],
      declarations: [
        AppComponent,
        IssueFilterPipe
      ],
    }).compileComponents();
  }));


  it(`should have any show error message`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.showError).toBeFalsy();
    expect(app.errorMessage).toEqual('Expected only CSV file.');
  });

  it(`should have header 'Issues Overview - CSV file reader' `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Issues Overview - CSV file reader');

  });

  it(`should not show table`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#issueList')).toBeNull();
  });



});
