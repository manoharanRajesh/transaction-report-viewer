import {Component} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {IssueDetails} from './model/IssueDetails';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private papa: Papa) {
  }
  filterIssueCount = 0;
  errorMessage = 'Expected only CSV file.';
  showError = false;

  issues: IssueDetails[] = [];

  handleFileSelect(evt) {
     // FileList object
    const file = evt.target.files[0];
    if (this.isaValidFileType(file)) {
      this.showError = false;
      this.issues =  this.readIssueDetails(file);
    } else {
      this.showError = true;
    }

  }

  private isaValidFileType(file): boolean {
    if (!(file && file.name.toUpperCase().endsWith('.CSV'))) {
      return false;
    }

    return true;

  }

  readIssueDetails(file): IssueDetails[] {
  const issues: IssueDetails[] = [];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: false,
        dynamicTyping: true,
        complete: (results) => {
          if (results && results.data) {
            for (const rowId in results.data) {
              if (rowId !== '0') {
                const col: any[] = results.data[rowId];
                if (col && col.length === 4) {
                  issues.push(new IssueDetails(col[0], col[1], Number(col[2]), col[3]));
                }
              }
            }
          }
        }
      });
    };
  return issues;
  }
}
