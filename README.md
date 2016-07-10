# secure-ls

Secure localStorage data with high level of encryption and data compression.

[![npm version](https://badge.fury.io/js/secure-ls.svg)](https://www.npmjs.com/package/secure-ls) [![Build Status](http://img.shields.io/travis/softvar/secure-ls/master.svg?style=flat)](http://travis-ci.org/softvar/secure-ls)

## Features

* Secure data with various types of encryption types including AES, DES, Rabbit and RC4. (defaults to `Base64` encoding).
* Compress data before storing it to `localStorage` to save extra bytes (defaults to `true`).
* Advanced API wrapper over `localStorage` API, providing other basic utilities.
* Save data in multiple keys inside `localStorage` and `secure-ls` will always remember it's creation.

## Installation

```
$ npm install secure-ls
```

## Usage

* Example 1: With `default` settings i.e. `Base64` Encoding and Data Compression

```
> var ls = new SecureLS();
> ls.set('key1', {data: 'test'}); // set key1
> ls.get('key1'); // print data
  {data: 'test'}
```

* Example 2: With `AES` Encryption and Data Compression

```
> var ls = new SecureLS({encodingType: 'aes'});
> ls.set('key1', {data: 'test'}); // set key1
> ls.get('key1'); // print data
  {data: 'test'}

> ls.set('key2', [1, 2, 3]); // set another key
> ls.getAllKeys(); // get all keys
  ["key1", "key2"]
> ls.removeAll(); // remove all keys

```

* Example 1: With `RC4` Encryption but no Data Compression

```
> var ls = new SecureLS({encodingType: 'rc4', isCompression: false});
> ls.set('key1', {data: 'test'}); // set key1
> ls.get('key1'); // print data
  {data: 'test'}

> ls.set('key2', [1, 2, 3]); // set another key
> ls.getAllKeys(); // get all keys
  ["key1", "key2"]
> ls.removeAll(); // remove all keys

```

## API Documentation

#### Create an instance / reference before using.

```
var ls = new SecureLS();
```

`Contructor` accepts a configurable (optional) `Object` with two keys.


| Config Keys       |     default    |      accepts                              |
| ----------------- | -------------- | ----------------------------------------- |
| **encodingType**  |     Base64     |  `base64`/`aes`/`des`/`rabbit`/`rc4`/`''` |
| **isCompression** |     `true`     |    `true`/`false`                         |

**Examples:**

* No config or empty Object i.e. Default **`Base64 Encoding`** and **`Data compression`**

```
var ls = new SecureLS();
// or
var ls = new SecureLS({});
```

* No encoding No data compression i.e. **`Normal`** way of storing data

```
var ls = new SecureLS({encodingType: '', isCompression: false});
```

* **`Base64`** encoding but **`no`** data compression

```
var ls = new SecureLS({isCompression: false});
```

* **`AES`** encryption and **`data compression`**

```
var ls = new SecureLS({encodingType: 'aes'});
```

* **`RC4`** encryption and **`no`** data compression

```
var ls = new SecureLS({encodingType: 'rc4', isCompression: false});
```

#### Methods

* **`set`**

  Saves `data` in specifed `key` in localStorage. If the key is not provided, the library will warn. Following types of JavaScript objects are supported:

  * Array
  * ArrayBuffer
  * Blob
  * Float32Array
  * Float64Array
  * Int8Array
  * Int16Array
  * Int32Array
  * Number
  * Object
  * Uint8Array
  * Uint8ClampedArray
  * Uint16Array
  * Uint32Array
  * String

  |   Parameter   |        Description          |
  | ------------- | --------------------------- |
  |     key       |     key to store data in    |
  |     data      |      data to be stored      |

  ```
    ls.set('key-name', {test: 'secure-ls'})
  ```

* **`get`**

  Gets `data` back from specified `key` from the localStorage library. If the key is not provided, the library will warn.

  |   Parameter   |         Description                 |
  | ------------- | ----------------------------------- |
  |     key       |     key in which data is stored     |

  ```
    ls.get('key-name'})
  ```

* **`remove`**

  Removes the value of a key from the localStorage. If the `meta key`, which stores the list of keys, is tried to be removed even if there are other keys which were created by `secure-ls` library, the library will warn for the action.

  |   Parameter   |         Description                       |
  | ------------- | ----------------------------------------- |
  |     key       |     remove key in which data is stored    |

  ```
    ls.remove('key-name')
  ```

* **`removeAll`**

  Removes all the keys that were created by the `secure-ls` library, even the `meta key`.

  ```
    ls.removeAll()
  ```

* **`clear`**

  Removes all the keys ever created for that particular domain. Remember localStorage works differently for `http` and `https` protocol;

  ```
    ls.clear()
  ```

* **`getAllKeys`**

  Gets the list of keys that were created using the `secure-ls` library. Helpful when data needs to be retrieved for all the keys or when keys name are not known(dynamically created keys).

  `getAllKeys()`

  ```
    ls.getAllKeys()
  ```

## Scripts

* `npm run build` - produces production version of the library under the `dist` folder
* `npm run dev` - produces development version of the library and runs a watcher
* `npm run test` - well ... it runs the tests :)

## Contributing

1. Fork the repo on GitHub.
2. Clone the repo on machine.
3. Execute `npm install` and `npm run dev`.
3. Create a new branch `<fix-typo>` and do your work.
4. Run `npm run build` to build dist files and `npm run test` to ensure all test cases are passing.
5. Commit your changes to the branch.
6. Submit a Pull request.

## Development Stack

* Webpack based `src` compilation & bundling and `dist` generation.
* ES6 as a source of writing code.
* Exports in a [umd](https://github.com/umdjs/umd) format so the library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

## License

Copyright (c) 2016 Varun Malhotra Licensed under the [MIT license](https://opensource.org/licenses/MIT).