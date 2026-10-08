import { create } from 'zustand';

export type Toast = { id: number; message: string };

let nextId = 1;

export const useToastStore = create<{
  toasts: Toast[];
  show: (message: string) => void;
  dismiss: (id: number) => void;
}>((set) => ({
  toasts: [],
  show: (message) => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function showToast(message: string) {
  useToastStore.getState().show(message);
}
