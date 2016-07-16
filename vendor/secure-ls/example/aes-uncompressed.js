var key = 'aes__uncompressed';
var data = {data: [{age: 1}, {age: '2'}]};
var aes_u = new SecureLS({encodingType: 'aes', isCompression: false});
ae = aes_u.AES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = aes_u.AES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(aes_u.enc._Utf8);

aes_u.set(key, data);
console.log('AES NOT Compressed');
console.log(localStorage.getItem(key));
console.log(aes_u.get(key));
console.log('____________________________________')