var key = 'aes__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var aes_c = new SecureLS({encodingType: 'aes', encryptionSecret: ''});
ae = aes_c.AES.encrypt(JSON.stringify(data), '')
bde = aes_c.AES.decrypt(ae.toString(), '')
de = bde.toString(aes_c.enc._Utf8)

aes_c.set(key, data);
console.log('AES Compressed');
console.log(localStorage.getItem(key));
console.log(aes_c.get(key));
console.log('____________________________________')