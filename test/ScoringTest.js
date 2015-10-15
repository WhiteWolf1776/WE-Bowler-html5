/**
 * Created by pscot3 on 10/15/2015.
 */
var assert = chai.assert;

describe( 'Scoring Tests', function() {

    it( 'should calculate individual frame scores', function() {
        var result = main.buildGreeting();
        assert.equal( result, 'hello, world' );
    } );

} );
