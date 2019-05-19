import {IssueFilterPipe} from './issueFilter.pipe';
import {IssueDetails} from '../model/IssueDetails';

describe('IssueFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new IssueFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Filter value based on issue count <= ', () => {
    const pipe = new IssueFilterPipe();
    const issues: IssueDetails[] = [];
    issues.push(new IssueDetails('f1', 'l1', 1, ''));
    issues.push(new IssueDetails('f2', 'l2', 2, ''));
    issues.push(new IssueDetails('f3', 'l3', 3, ''));

    const actual: [] =  pipe.transform(issues, 3);
    // @ts-ignore
    expect(actual.length).toEqual(1);
  });

  it('Filter value based on issue count <= ', () => {
    const pipe = new IssueFilterPipe();
    const issues: IssueDetails[] = [];
    issues.push(new IssueDetails('f1', 'l1', 1, ''));
    issues.push(new IssueDetails('f2', 'l2', 2, ''));
    issues.push(new IssueDetails('f3', 'l3', 3, ''));

    const actual: [] =  pipe.transform(issues, 1);
    // @ts-ignore
    expect(actual.length).toEqual(3);
  });

  it('Unexpected object return the same', () => {
    const pipe = new IssueFilterPipe();
    // @ts-ignore
    const actual =  pipe.transform({}, 1);
    expect(actual).toEqual({});

    const emptyArray =  pipe.transform([], 1);
    expect(emptyArray).toEqual([]);
  });
});
