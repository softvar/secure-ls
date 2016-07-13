var key = 'des__compressed';
var data = {data: [{age: 1}, {age: '2'}]};
var des_c = new SecureLS({encodingType: 'des'});
ae = des_c.DES.encrypt(JSON.stringify(data), 's3cr3t@123');
bde = des_c.DES.decrypt(ae.toString(), 's3cr3t@123');
de = bde.toString(des_c.enc._Utf8);

des_c.set(key, data);
console.log('DES Compressed');
console.log(localStorage.getItem(key));
console.log(des_c.get(key));
console.log('____________________________________')