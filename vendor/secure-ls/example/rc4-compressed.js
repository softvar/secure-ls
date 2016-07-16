var key = 'rc4__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var rc4_c = new SecureLS({encodingType: 'rc4'});
ae = rc4_c.RC4.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = rc4_c.RC4.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(rc4_c.enc._Utf8);

rc4_c.set(key, data);
console.log('RC4 Compressed');
console.log(localStorage.getItem(key));
console.log(rc4_c.get(key));
console.log('____________________________________')