import * as SecureStore from 'expo-secure-store';

const STORAGE_TOKEN_KEY = 'token';

export async function deviceGetStoredAuthToken() {
  return await SecureStore.getItemAsync(STORAGE_TOKEN_KEY);
}

export async function deviceStoreAuthToken({ token }) {
  await SecureStore.setItemAsync(STORAGE_TOKEN_KEY, token);
}

export async function deviceDeleteAuthToken() {
  await SecureStore.deleteItemAsync(STORAGE_TOKEN_KEY);
}
