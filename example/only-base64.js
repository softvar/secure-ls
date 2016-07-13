var key = 'only__base64';
var data = {data: [{age: 1}, {age: '2'}]};
var o_b = new SecureLS({isCompression: false});
ae = o_b.AES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = o_b.AES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(o_b.enc._Utf8);

o_b.set(key, data);
console.log('Only Base64, no compression');
console.log(localStorage.getItem(key));
console.log(o_b.get(key));
console.log('____________________________________')