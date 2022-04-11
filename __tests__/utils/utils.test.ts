import { formatDate } from '../../src/utils/date';

describe('formatDate', () => {
  it('passing null should return null', () => {
    expect(formatDate(null)).toEqual(null);
  });

  it('passing undefined should return null', () => {
    expect(formatDate(undefined)).toEqual(null);
  });

  it('passing 1977-05-25 return a valid date string', () => {
    expect(formatDate('1977-05-25')).toEqual('Tue May 24 1977');
  });
});
