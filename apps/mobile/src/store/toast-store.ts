import { create } from 'zustand';

export type ToastKind = 'info' | 'success' | 'warn' | 'error';
export type Toast = { id: number; message: string; kind: ToastKind };

let nextId = 1;

export const useToastStore = create<{
  toasts: Toast[];
  show: (message: string, kind?: ToastKind) => void;
  dismiss: (id: number) => void;
}>((set) => ({
  toasts: [],
  show: (message, kind = 'info') => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function showToast(message: string, kind?: ToastKind) {
  useToastStore.getState().show(message, kind);
}
