const assert = require('assert');
const DB_IO = require('../db_io');
let dbHandle = DB_IO.database;

before('set up test-environment', function(){
    //connect to test-database
    //create collections
    //done();
    dbHandle = DB_IO.dbInit('testing');    
});

beforeEach('drop and create test data', function(){
    //wipe out all data in collections
    //create test-data entries in collections
});

after(function(){
    console.log('thicc')
    dbHandle.close();
})

describe('Database', function() {
    describe('#dbInit()', function() {
	it('should connect to the database without error', function() {
	    	    
	});
    });
});
