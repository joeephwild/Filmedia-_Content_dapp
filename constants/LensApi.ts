import {
  LensClient,
  development,
  IStorageProvider,
} from "@lens-protocol/client";

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

const lensClientConfig = {
  environment: development,
};

export const lensClient = new LensClient(lensClientConfig);
