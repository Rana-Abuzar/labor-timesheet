'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { AlertTriangle, Trash2, HelpCircle } from 'lucide-react';

type DialogVariant = 'danger' | 'warning' | 'info';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: DialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig: Record<DialogVariant, {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  btnBg: string;
  btnHoverBg: string;
}> = {
  danger: {
    icon: <Trash2 size={22} />,
    iconBg: 'rgba(239,68,68,0.1)',
    iconColor: '#ef4444',
    btnBg: '#ef4444',
    btnHoverBg: '#dc2626',
  },
  warning: {
    icon: <AlertTriangle size={22} />,
    iconBg: 'rgba(245,158,11,0.1)',
    iconColor: '#f59e0b',
    btnBg: '#f59e0b',
    btnHoverBg: '#d97706',
  },
  info: {
    icon: <HelpCircle size={22} />,
    iconBg: 'rgba(59,130,246,0.1)',
    iconColor: '#3b82f6',
    btnBg: '#3b82f6',
    btnHoverBg: '#2563eb',
  },
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'warning',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const config = variantConfig[variant];

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onCancel();
  }, [onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
      onKeyDown={handleKeyDown}
    >
      <div
        className="rounded-2xl shadow-2xl"
        style={{
          background: 'var(--bg-card, #fff)',
          border: '1px solid var(--border, #e5e7eb)',
          width: 400,
          maxWidth: '90vw',
          animation: 'confirmSlideIn 0.2s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 pb-4 flex flex-col items-center text-center">
          <div
            className="flex items-center justify-center rounded-full mb-4"
            style={{
              width: 48,
              height: 48,
              background: config.iconBg,
              color: config.iconColor,
            }}
          >
            {config.icon}
          </div>
          <h3
            className="text-base font-semibold mb-1.5"
            style={{ color: 'var(--text-primary, #111)' }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-muted, #6b7280)' }}
          >
            {message}
          </p>
        </div>

        <div
          className="flex gap-3 px-6 pb-6 pt-2"
        >
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: 'var(--bg-sidebar, #f9fafb)',
              color: 'var(--text-light, #374151)',
              border: '1px solid var(--border, #e5e7eb)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--border, #e5e7eb)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-sidebar, #f9fafb)'; }}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: config.btnBg,
              color: '#fff',
              border: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = config.btnHoverBg; }}
            onMouseLeave={e => { e.currentTarget.style.background = config.btnBg; }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confirmSlideIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Hook for easy usage
export function useConfirmDialog() {
  const [state, setState] = React.useState<{
    open: boolean;
    title: string;
    message: string;
    variant: DialogVariant;
    confirmLabel: string;
    resolve: ((val: boolean) => void) | null;
  }>({ open: false, title: '', message: '', variant: 'warning', confirmLabel: 'Confirm', resolve: null });

  const confirm = useCallback((opts: {
    title: string;
    message: string;
    variant?: DialogVariant;
    confirmLabel?: string;
  }): Promise<boolean> => {
    return new Promise(resolve => {
      setState({
        open: true,
        title: opts.title,
        message: opts.message,
        variant: opts.variant ?? 'warning',
        confirmLabel: opts.confirmLabel ?? 'Confirm',
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState(s => ({ ...s, open: false }));
  }, [state]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState(s => ({ ...s, open: false }));
  }, [state]);

  const dialog = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      message={state.message}
      variant={state.variant}
      confirmLabel={state.confirmLabel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, dialog };
}
