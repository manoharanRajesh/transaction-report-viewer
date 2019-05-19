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
  errorMessage = 'Expected only CSV file only.';
  showError = false;

  issues: IssueDetails[] = [];

  handleFileSelect(evt) {
     // FileList object
    const file = evt.target.files[0];
    if (this.isaValidFileType(file)) {
      this.showError = false;
      this.issues =  this.readIssueDetails(file);
    } else {
      this.errorMessage = 'Expected only CSV file or error occurred while reading.';
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
  reader.onload = () => {
    const csvData = reader.result;
    const csvRows = (csvData as string).split(/\r\n|\n/);
    const headerCol: string[] = this.getHeader(csvRows);
    if (headerCol && headerCol.length === 4) {
      this.showError = true;
      this.errorMessage = 'Invalid number of columns';
    } else {
      this.showError = false;
    }
    this.issues = this.parseIssuesDetailsFromCSVFile(csvRows, 1);
    };
  return issues;
  }


  getHeader(csvRecordsArr: any): string[] {
    const headerRow = (csvRecordsArr[0] as string).split(',');
    const headerColumns: string[] = [];
    headerRow.forEach(c => {headerColumns.push(c); });
    return headerColumns;
  }

  /**
   * Parse the rows to IssueDetails and skip the header.
   * @param csvRows csvData
   * @param headerRow - default 0 no header
   * @param headerLength - number of columns expected , default 4.
   */
  parseIssuesDetailsFromCSVFile(csvRows: any[], headerRow: number = 0 , headerLength: number = 4): IssueDetails[] {
    const issues: IssueDetails[] = [];

    for (let i = headerRow; i < csvRows.length; i++) {
      const data = (csvRows[i] as string).split(',');
      if (data.length === headerLength) {
        issues.push(new IssueDetails(data[0], data[1], Number(data[2]), data[3]));
      }
    }

    return issues;
  }


}
