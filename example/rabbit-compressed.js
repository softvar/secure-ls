var key = 'rabbit__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var rabbit_c = new SecureLS({encodingType: 'rabbit'});
ae = rabbit_c.RABBIT.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = rabbit_c.RABBIT.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(rabbit_c.enc._Utf8);

rabbit_c.set(key, data);
console.log('RABBIT Compressed');
console.log(localStorage.getItem(key));
console.log(rabbit_c.get(key));
console.log('____________________________________')