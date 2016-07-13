var key = 'rabbit__uncompressed';
var data = {data: [{age: 1}, {age: '2'}]};
var rabbit_u = new SecureLS({encodingType: 'rabbit', isCompression: false});
ae = rabbit_u.RABBIT.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = rabbit_u.RABBIT.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(rabbit_u.enc._Utf8);

rabbit_u.set(key, data);
console.log('RABBIT not Compressed');
console.log(localStorage.getItem(key));
console.log(rabbit_u.get(key));
console.log('____________________________________')