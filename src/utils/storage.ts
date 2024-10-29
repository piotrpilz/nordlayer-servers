export const STORAGE_KEYS = {
  AUTH_TOKEN: 'AUTH_TOKEN'
}

class Storage {
  setItem<T>(key: string, value: T) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue)
    } catch (err) {
      console.error('Error during storing in localstorage', err);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue);
    } catch (err) {
      console.error('Error during getting from localstorage', err);
      return null;
    }
  }
}

export default new Storage()
