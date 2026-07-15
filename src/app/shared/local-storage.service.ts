import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get<T>(key: string): T | undefined {
    const storage = this.getStorage();

    if (!storage) {
      return undefined;
    }

    const value = storage.getItem(key);

    if (value === null) {
      return undefined;
    }

    return this.deserialize<T>(value);
  }

  set<T>(key: string, value: T): boolean {
    const storage = this.getStorage();

    if (!storage) {
      return false;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  delete(key: string): boolean {
    const storage = this.getStorage();

    if (!storage) {
      return false;
    }

    try {
      storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  clear(): boolean {
    const storage = this.getStorage();

    if (!storage) {
      return false;
    }

    try {
      storage.clear();
      return true;
    } catch {
      return false;
    }
  }

  private getStorage(): Storage | null {
    if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
      return null;
    }

    return globalThis.localStorage;
  }

  private deserialize<T>(value: string): T {
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }
}
