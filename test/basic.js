import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecureLS from '../dist/secure-ls.js';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;
let lib;

describe('Basic suites ->', () => {
  before(() => {

  });

  describe('instance creation', () => {
    lib = new SecureLS();

    it('should check correct instance creation', () => {
      expect(lib).to.be.instanceof(SecureLS);
    });
    it('should return the name', () => {
      expect(lib._name).to.be.equal('secure-ls');
    });

  });

  describe('constructor', () => {
    lib = new SecureLS();

    it('should be called on instance creation', () => {
      expect(lib._name).to.exist;
      expect(lib.utils).to.exist;
      expect(lib.constants).to.exist;
      expect(lib.Base64).to.exist;
      expect(lib.LZString).to.exist;
      expect(lib.AES).to.exist;
      expect(lib.DES).to.exist;
      expect(lib.RABBIT).to.exist;
      expect(lib.RC4).to.exist;
      expect(lib.enc).to.exist;
      expect(lib.ls).to.exist;
      expect(lib.config).to.exist;
      expect(lib.config).to.be.an('object');
      expect(lib.config).to.include.keys('encodingType', 'isCompression');
    });
    it('should call init method', () => {
      let spy = sinon.spy(lib, 'init');

      // mock as if new instance is created but actually not
      // Can't expect otherwise Object reference would be lost
      expect(spy).to.not.be.called;
      lib.init();
      expect(spy).to.be.called;
    });
    it('should define enums, booleans and others', () => {
      expect(lib.WarningEnum).to.exist;
      expect(lib.WarningTypes).to.exist;
      expect(lib.EncrytionTypes).to.exist;
      expect(lib.utils.allKeys).to.exist;
      expect(lib.utils.allKeys).to.be.an('array');
    });
  });

});
