var key = 'des__uncompressed';
var data = {data: [{age: 1}, {age: '2'}]};
var des_u = new SecureLS({encodingType: 'des', isCompression: false});
ae = des_u.DES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = des_u.DES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(des_u.enc._Utf8);

des_u.set(key, data);
console.log('DES not Compressed');
console.log(localStorage.getItem(key));
console.log(des_u.get(key));
console.log('____________________________________')