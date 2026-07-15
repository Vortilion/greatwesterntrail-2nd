import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a number value', () => {
    const setResult = service.set('test-number', 42);
    const value = service.get<number>('test-number');

    expect(setResult).toBe(true);
    expect(value).toBe(42);
  });

  it('should set and get a boolean value', () => {
    const setResult = service.set('test-boolean', true);
    const value = service.get<boolean>('test-boolean');

    expect(setResult).toBe(true);
    expect(value).toBe(true);
  });

  it('should return undefined for unknown key', () => {
    const value = service.get('missing-key');

    expect(value).toBeUndefined();
  });

  it('should delete a stored key', () => {
    service.set('to-delete', 'value');

    const deleteResult = service.delete('to-delete');
    const value = service.get('to-delete');

    expect(deleteResult).toBe(true);
    expect(value).toBeUndefined();
  });

  it('should clear all keys', () => {
    service.set('key-1', 'a');
    service.set('key-2', 'b');

    const clearResult = service.clear();
    const key1 = service.get('key-1');
    const key2 = service.get('key-2');

    expect(clearResult).toBe(true);
    expect(key1).toBeUndefined();
    expect(key2).toBeUndefined();
  });

  it('should fallback to raw string when JSON parsing fails', () => {
    localStorage.setItem('raw', 'not-json');

    const value = service.get<string>('raw');

    expect(value).toBe('not-json');
  });
});
