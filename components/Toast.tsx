'use client';

// Thin adapter over sonner so all existing call sites keep working unchanged.
// Call sites use: const { showToast } = useToast()
//   showToast(message, 'success' | 'warning' | 'info' | 'pro', durationMs?)

import { toast } from 'sonner';

type ToastType = 'success' | 'warning' | 'info' | 'pro';

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

export function useToast(): ToastContextValue {
  const showToast = (message: string, type: ToastType = 'info', duration = 4000) => {
    const opts = { duration };
    switch (type) {
      case 'success': toast.success(message, opts); break;
      case 'warning': toast.warning(message, opts); break;
      case 'pro':     toast(message, { ...opts, icon: '👑' }); break;
      default:        toast.info(message, opts);
    }
  };
  return { showToast };
}

// Legacy no-op wrapper — kept so Providers.tsx import doesn't break.
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
