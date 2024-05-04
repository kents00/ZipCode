const { queryDatabase, db } = require('./modular.js');

jest.mock('sqlite3', () => {
  const mDatabase = {
    all: jest.fn((query, params, callback) => {
      const input = params[0];
      switch (input) {
        case '%7204%':
          callback(null, [{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
          break;
        case '%1234%':
          callback(null, [{ region: 'AnotherRegion', province: 'AnotherProvince', city: 'AnotherCity', zip_code: '1234' }]);
          break;
        case '%Cagayan%':
          callback(null, [{ region: 'AnotherRegion', province: 'Cagayan', city: 'AnotherCity', zip_code: '7203' }]);
          break;
        case '%TestCity%':
          callback(null, [{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
          break;
        case '%TestRegion%':
          callback(null, [{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
          break;
        default:
          callback(null, []);
          break;
      }
    }),
    close: jest.fn(),
  };
  return {
    verbose: jest.fn(() => {
      return {
        Database: jest.fn(() => mDatabase),
      };
    }),
  };
});

describe('queryDatabase', () => {
  it('should return rows matching the zipcode 7204', (done) => {
    queryDatabase('7204', (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
      done();
    });
  });

  // Add more test cases for province, city, and region
  it('should return rows matching the province Cagayan', (done) => {
    queryDatabase('Cagayan', (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([{ region: 'AnotherRegion', province: 'Cagayan', city: 'AnotherCity', zip_code: '7203' }]);
      done();
    });
  });

  it('should return rows matching the city TestCity', (done) => {
    queryDatabase('TestCity', (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
      done();
    });
  });

  it('should return rows matching the region TestRegion', (done) => {
    queryDatabase('TestRegion', (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([{ region: 'TestRegion', province: 'TestProvince', city: 'TestCity', zip_code: '7204' }]);
      done();
    });
  });

  it('should return an empty array for an input with no matches', (done) => {
    queryDatabase('no-match', (err, rows) => {
      expect(err).toBeNull();
      expect(rows).toEqual([]);
      done();
    });
  });
});
