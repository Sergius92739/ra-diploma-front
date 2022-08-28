import type { TAppDispatch, TRootState } from '../store';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const useStorage = (storage: IStorage, key: string, jsonify = true) => {
  const [value, setValue] = useState(
    jsonify ? JSON.parse(storage.getItem(key) as string) : storage.getItem(key)
  );

  useEffect(() => {
    if (value === null) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, jsonify ? JSON.stringify(value) : value);
  }, [value, storage, key, jsonify]);

  return [value, setValue];
}

