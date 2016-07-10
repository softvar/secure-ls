var key = 'aes__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var aes_c = new SecureLS({encodingType: 'aes'});
ae = aes_c.AES.encrypt(JSON.stringify(data), 's3cr3t@123')
bde = aes_c.AES.decrypt(ae.toString(), 's3cr3t@123')
de = bde.toString(aes_c.enc._Utf8)

aes_c.set(key, data);
console.log(aes_c.get(key));
console.log('____________________________________')