export = SecureLS;

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
}

declare namespace SecureLS{}