import { tokenStore } from "@/lib/apiClient";

export const DEMO_OTP = "123456";

export function isSignedIn() {
  return Boolean(tokenStore.getToken());
}

export function signInSession() {
  tokenStore.setToken(`demo.${Date.now()}`);
  tokenStore.setRefreshToken(`demo.refresh.${Date.now()}`);
}

export function signOutSession() {
  tokenStore.clearAll();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPassword(value: string) {
  return value.length >= 8;
}

export function isDemoOtp(value: string) {
  return value === DEMO_OTP;
}

export function wait(ms = 400) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
