var data = {data: [{age: 1}, {age: '2'}]};
var aesCRealm1 = new SecureLS({encodingType: 'aes', encryptionSecret: 'secret1', encryptionNamespace: 'realm1'});
var key1 = 'aes__compressed_1';
var ae = aesCRealm1.AES.encrypt(JSON.stringify(data), '');
var bde = aesCRealm1.AES.decrypt(ae.toString(), '');
var de = bde.toString(aesCRealm1.enc._Utf8);
var aesCRealm2 = new SecureLS({encodingType: 'aes', encryptionSecret: 'secret2', encryptionNamespace: 'realm2'});
var key2 = 'aes__compressed_2';
var ae2 = aesCRealm2.AES.encrypt(JSON.stringify(data), '');
var bde2 = aesCRealm2.AES.decrypt(ae2.toString(), '');
var de2 = bde2.toString(aesCRealm2.enc._Utf8);

aesCRealm1.set(key1, data);
console.log('AES Compressed Realm1');
console.log(localStorage.getItem(key1));
console.log(aesCRealm1.get(key1));
console.log('____________________________________');

aesCRealm2.set(key2, data);
console.log('AES Compressed Realm2');
console.log(localStorage.getItem(key2));
console.log(aesCRealm2.get(key2));
console.log('____________________________________');
