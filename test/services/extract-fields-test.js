describe('field list extractor', function() {
  var fields;
  beforeEach(function() {
    module("metaApp");
    inject(function(extractFields) {
      fields = extractFields;
    });
  });

  it('returns an empty list of field names for an empty list of objects', function() {
    expect(fields([])).toEqual([]);
  });
  it('returns a list of all field names from a list of objects', function() {
    expect(fields([{a: 3}, {b: 4}])).toEqual(['a', 'b']);
  });
  it('eliminates duplicates', function() {
    expect(fields([{a: 3}, {a: 4}])).toEqual(['a']);
  });
  it('eliminates duplicates', function() {
    expect(fields([{a: 3}, {a: 4}])).toEqual(['a']);
  });
  it('allows numeric field names', function() {
    expect(fields([{3: 'x'}, {4: 'y'}])).toEqual(['3', '4']);
  });
  it('ignores nested data', function() {
    expect(fields([{grandparent: { parent: { child: 3 } }}])).toEqual(['grandparent']);
  });
});
