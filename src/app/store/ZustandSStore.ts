"use client";

import { create } from "zustand";

interface OverlayLoginState {
  dataOverlayLogin: boolean;
  setOverlayLogin: (data: boolean) => void;
}
interface OverlayRegisterState {
  dataOverlayRegister: boolean;
  setOverlayRegister: (data: boolean) => void;
}

interface OverlayForgotPasswordState {
  dataOverlayForgotPassword: boolean;
  setOverlayForgotPassword: (data: boolean) => void;
}
interface OverlayCartState {
  dataOverlayCart: boolean;
  setOverlayCart: (data: boolean) => void;
}
interface LoadingState {
  dataLoading: boolean;
  setLoading: (data: boolean) => void;
}

interface ReloadOrderState {
  dataReloadOrder: boolean;
  setReloadOrder: (cb: (prev: boolean) => boolean) => void;
}

// store để lưu dữ liệu người dùng
export const useStore = create((set) => ({
  dataUsers: [],
  setDataUsers: (data: any) => set({ dataUsers: data }),
}));

// login
export const OverlayLoginStore = create<OverlayLoginState>((set) => ({
  dataOverlayLogin: false,
  setOverlayLogin: (data) => set({ dataOverlayLogin: data }),
}));
// register
export const OverlayRegisterStore = create<OverlayRegisterState>((set) => ({
  dataOverlayRegister: false,
  setOverlayRegister: (data) => set({ dataOverlayRegister: data }),
}));
// forgot password
export const OverlayForgotPasswordStore = create<OverlayForgotPasswordState>(
  (set) => ({
    dataOverlayForgotPassword: false,
    setOverlayForgotPassword: (data) =>
      set({ dataOverlayForgotPassword: data }),
  })
);

// overlay cart
export const OverlayCartStore = create<OverlayCartState>((set) => ({
  dataOverlayCart: false,
  setOverlayCart: (data) => set({ dataOverlayCart: data }),
}));

// data cart
export const CartStore = create<any>((set) => ({
  dataCart: [],
  setDataCart: (data: any) => set({ dataCart: data }),
}));

// refresh cart
export const RefreshCartStore = create((set) => ({
  dataRefreshCart: false,
  setRefreshCart: (data: boolean) => set({ dataRefreshCart: data }),
}));

// store để refresh dữ liệu
export const refreshStore = create((set) => ({
  dataRefresh: false,
  setRefresh: (data: boolean) => set({ dataRefresh: data }),
}));
