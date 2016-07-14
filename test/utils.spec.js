import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SecureLS from '../dist/secure-ls.js';

chai.expect();
chai.use(sinonChai);

const expect = chai.expect;
let lib;

describe('Utils tests', () => {
    beforeEach(() => {
      sinon.spy(console, 'warn');
      lib = new SecureLS();
    });

    afterEach(() => {
      console.warn.restore();
      lib.removeAll();
    });

    describe('variables initialization', () => {
      it('should verify meta-key', () => {
        expect(lib.utils.metaKey).to.be.a('string');
        expect(lib.utils.metaKey).to.equal('_secure__ls__metadata');
      });
      it('should verify encryptionSecret', () => {
        expect(lib.utils.encryptionSecret).to.be.a('string');
        expect(lib.utils.encryptionSecret).to.equal('');
      });
      it('should verify secretPhrase', () => {
        expect(lib.utils.secretPhrase).to.be.a('string');
        expect(lib.utils.secretPhrase).to.equal('s3cr3t$#@135^&*246');
      });
      it('should verify allKeys', () => {
        expect(lib.utils.allKeys).to.be.an('array');
        expect(lib.utils.allKeys.length).to.equal(0);
      });
    });

    describe('method: is ->', () => {
      it('return true if key is present', () => {
        let response;

        response = lib.utils.is('yes')
        expect(response).to.equal(true);
      });
      it('return false if key is present', () => {
        let response;

        response = lib.utils.is()
        expect(response).to.equal(false);
      });
    });

    describe('method: warn ->', () => {
      it('warn with default warning msg if no reason provided', () => {
        lib.utils.warn();
        expect(console.warn).to.be.called;
        expect(console.warn.calledWith('Unexpected output')).to.be.ok;
      });
      it('warn with undefined warning msg if wrong reason provided', () => {
        lib.utils.warn('wrong');
        expect(console.warn).to.be.called;
        expect(console.warn.calledWith('Unexpected output')).to.not.be.ok;
      });
      it('warn with warning msg as per reason provided', () => {
        lib.utils.warn('keyNotProvided');
        expect(console.warn).to.be.called;
        expect(console.warn.calledWith('Secure LS: Key not provided. Aborting operation!')).to.be.ok;
      });

      describe('method: generateSecretKey ->', () => {
        it('validate PBKDF2 key generated', () => {
          let encryptionKey = lib.utils.generateSecretKey()

          expect(encryptionKey).to.be.a('string');
          expect(encryptionKey.length).to.be.above(30);
        });
      });

      describe('method: getObjectFromKey ->', () => {
        it('if no data provided, return', () => {
          let response;

          response = lib.utils.getObjectFromKey();
          expect(response).to.be.an('object');
          expect(response).to.be.empty;
        });

        it('if data provided is empty array, return', () => {
          let response;

          response = lib.utils.getObjectFromKey([]);
          expect(response).to.be.an('object');
          expect(response).to.be.empty;
        });

        it('should return obj matching the key provided', () => {
          let response, key = 'name', data = [{
            k: 'name',
            test: 'case1'
          }, {
            k: 'age',
            test: 'case2'
          }];

          response = lib.utils.getObjectFromKey(data, key);

          expect(response).to.be.an('object');
          expect(response).to.not.be.empty;
          expect(response).to.include.keys('k');
          expect(response).to.include.keys('test');
          expect(response).to.equal(data[0]);
        });
      });

      describe('method: extractKeyNames ->', () => {
        it('should return just the `k` values', () => {
          let response, key = 'name', data = {
            keys: [{
              k: 'name',
              test: 'case1'
            }, {
              k: 'age',
              test: 'case2'
            }]
          };

          response = lib.utils.extractKeyNames(data);

          expect(response).to.be.an('array');
          expect(response).to.include('name');
          expect(response).to.not.include('test');
        });
      });

      describe('method: isKeyPresent ->', () => {
        it('should return the boolean based on key presence', () => {
          let response, key = 'name';

          lib.utils.allKeys = [{
           k: 'name',
            test: 'case1'
          }, {
            k: 'age',
            test: 'case2'
          }];

          response = lib.utils.isKeyPresent(key);

          expect(response).to.be.a('boolean');
          expect(response).to.equal(true);

          response = lib.utils.isKeyPresent('wrong-key');

          expect(response).to.be.a('boolean');
          expect(response).to.equal(false);
        });
      });

      describe('method: removeFromKeysList ->', () => {
        it('should remove object from array if key matches', () => {
          let response;

          lib.utils.allKeys = [{
           k: 'name',
            test: 'case1'
          }, {
            k: 'age',
            test: 'case2'
          }];

          expect(lib.utils.allKeys.length).to.equal(2);

          // length should dec by 1
          response = lib.utils.removeFromKeysList('name');
          expect(lib.utils.allKeys.length).to.equal(1);

          // length should not change
          response = lib.utils.removeFromKeysList('wrong-key');
          expect(lib.utils.allKeys.length).to.equal(1);

          // length should be 0
          response = lib.utils.removeFromKeysList('age');
          expect(lib.utils.allKeys.length).to.equal(0);
        });
      });
    });
});