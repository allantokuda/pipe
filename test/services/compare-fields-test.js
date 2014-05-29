describe('field list comparator', function() {
  var comparison;
  beforeEach(function() {
    module("metaApp");
    inject(function(compareFields) {
      comparison = compareFields;
    });
  });

  it('returns a full comparison of the fields in the given lists', function() {
    expect(comparison(['a', 'b'], ['b', 'c'])).toEqual({ common: ['b'], only1: ['a'], only2: ['c'] });
  });

  it('handles two empty lists', function() {
    expect(comparison([], [])).toEqual({ common: [], only1: [], only2: [] });
  });

  it('handles an empty list 1', function() {
    expect(comparison([], ['x'])).toEqual({ common: [], only1: [], only2: ['x'] });
  });

  it('handles an empty list 2', function() {
    expect(comparison(['q'], [])).toEqual({ common: [], only1: ['q'], only2: [] });
  });

  it('finds when there is no overlap', function() {
    expect(comparison(['a'], ['b'])).toEqual({ common: [], only1: ['a'], only2: ['b'] });
  });

  it('finds when the lists are identical', function() {
    expect(comparison(['a', 'b'], ['a', 'b'])).toEqual({ common: ['a', 'b'], only1: [], only2: [] });
  });

  it('finds when list 1 is a subset of list 2', function() {
    expect(comparison(['a', 'b'], ['a', 'b', 'c'])).toEqual({ common: ['a', 'b'], only1: [], only2: ['c'] });
  });

  it('finds when list 2 is a subset of list 1', function() {
    expect(comparison(['a', 'b', 'c'], ['a', 'b'])).toEqual({ common: ['a', 'b'], only1: ['c'], only2: [] });
  });

  it('deduplicates keys in list 1', function() {
    expect(comparison(['a', 'a', 'b'], ['a'])).toEqual({ common: ['a'], only1: ['b'], only2: [] });
  });

  it('deduplicates keys in list 2', function() {
    expect(comparison(['a'], ['a', 'a', 'b'])).toEqual({ common: ['a'], only1: [], only2: ['b'] });
  });
});
