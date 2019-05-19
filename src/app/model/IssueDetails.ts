export class IssueDetails {
  firstName: string;
  lastName: string;
  issueCount: number;
  dateOfBirth: string;


  constructor(firstName: string, lastName: string, issueCount: number = 0,
              dateOfBirth: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.issueCount = Number.isNaN(issueCount) ? 0 : issueCount;
    this.dateOfBirth = dateOfBirth;
  }
}
