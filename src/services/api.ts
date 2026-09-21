import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const defaultApiUrl = 'http://localhost:8080';
const authTokenKey = 'reviu.authToken';

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? defaultApiUrl
).replace(/\/$/, '');

export async function saveAuthToken(token: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(authTokenKey, token);
    return;
  }
  await SecureStore.setItemAsync(authTokenKey, token);
}

export async function getAuthToken() {
  if (Platform.OS === 'web') {
    return localStorage.getItem(authTokenKey);
  }
  return SecureStore.getItemAsync(authTokenKey);
}

export async function clearAuthToken() {
  if (Platform.OS === 'web') {
    localStorage.removeItem(authTokenKey);
    return;
  }
  await SecureStore.deleteItemAsync(authTokenKey);
}

export async function getApiErrorMessage(response: Response) {
  const responseText = await response.text();

  if (!responseText) {
    return `Não foi possível concluir a operação (${response.status}).`;
  }

  try {
    const body = JSON.parse(responseText) as {
      message?: string;
      error?: string;
    };

    return body.message ?? body.error ?? responseText;
  } catch {
    return responseText;
  }
}