import {Pipe, PipeTransform} from '@angular/core';
import {IssueDetails} from '../model/IssueDetails';

@Pipe({
  name: 'issueFilter'
})
export class IssueFilterPipe implements PipeTransform {

  transform(values: IssueDetails[], issue: number = 0): any {
    if (!Array.isArray(values)) {
      return values;
    }
    return values.filter(v => {
      return v.issueCount >= issue;
    });

  }

}
