export = SecureLS;

import * as LZString from 'lz-string';
import {CipherHelper, Encoder} from 'crypto-js';

declare class SecureLS {
    constructor(config?: { isCompression?: boolean, encodingType?: string, encryptionSecret?: string , encryptionNamespace?: string });
    getEncryptionSecret(): string;
    get(key: string, isAllKeysData?: boolean): any;
    getDataFromLocalStorage(key: string): string | null;
    getAllKeys(): string[];
    set(key: string, data: any): void;
    setDataToLocalStorage(key: string, data: string): void;
    remove(key: string): void;
    removeAll(): void;
    clear(): void;
    resetAllKeys(): [];
    processData(data: any | string, isAllKeysData: boolean): string;
    setMetaData(): void;
    getMetaData(): { keys: string[] };

    _name: 'secure-ls';
    Base64: SecureLS.Base64;
    LZString: LZString.LZStringStatic;
    AES: CipherHelper;
    DES: CipherHelper;
    RABBIT: CipherHelper;
    RC4: CipherHelper;
    enc: {
        Latin1: Encoder;
        _Utf8: Encoder;
    };
}

declare namespace SecureLS{
    interface Base64 {
        _keyStr: string;
        encode(e: string): string;
        decode(e: string): string;
    }
}