describe('CSV object extractor', function() {
  var extracted;
  beforeEach(function() {
    module("metaApp");
    inject(function(extractCsv) {
      extracted = extractCsv;
    });
  });
  it('returns an object from a one-line CSV', function() {
    expect(extracted("a,b\nsomething,2")).toEqual([{ a: 'something', b: 2 }]);
  });
  it('returns an empty array when CSV is null', function() {
    expect(extracted(null)).toEqual([]);
  });
  it('returns an empty array when CSV is empty', function() {
    expect(extracted("")).toEqual([]);
  });
  it('returns an empty array when CSV has only 1 (assumed header) line', function() {
    expect(extracted("a,b")).toEqual([]);
  });
  it('returns an empty array when CSV has only 1 line and an incomplete, empty data line', function() {
    expect(extracted("a,b\n")).toEqual([]);
  });
  it('returns an array with blanks when CSV has only 1 header line and a complete but empty data line', function() {
    expect(extracted("a,b\n,\n")).toEqual([{a: null, b: null}]);
  });
  it('treats blanks as null values', function() {
    expect(extracted("a,b\n\"\",\"\"\n")).toEqual([{a: null, b: null}]);
  });
});
