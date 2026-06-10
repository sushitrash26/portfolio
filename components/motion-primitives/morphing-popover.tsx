'use client';

import {
  useState,
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
  isValidElement,
} from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  Variants,
} from 'motion/react';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';

const TRANSITION = {
  type: 'spring' as const,
  bounce: 0.05,
  duration: 0.5,
};

// Content morph variants — scales + fades in from a small collapsed state
const CONTENT_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    scale: 0.7,
    transformOrigin: 'top right',
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', bounce: 0.15, duration: 0.45 },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    filter: 'blur(4px)',
    transition: { type: 'spring', bounce: 0, duration: 0.3 },
  },
};

type MorphingPopoverContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  uniqueId: string;
  variants?: Variants;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

const MorphingPopoverContext =
  createContext<MorphingPopoverContextValue | null>(null);

function usePopoverLogic({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const uniqueId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isOpen = controlledOpen ?? uncontrolledOpen;

  const open = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(true);
    }
    onOpenChange?.(true);
  };

  const close = () => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
  };

  return { isOpen, open, close, uniqueId };
}

export type MorphingPopoverProps = {
  children: React.ReactNode;
  transition?: {
    type?: 'spring' | 'tween' | 'keyframes' | 'inertia';
    bounce?: number;
    duration?: number;
    [key: string]: unknown;
  };
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: Variants;
  className?: string;
} & React.ComponentProps<'div'>;

function MorphingPopover({
  children,
  transition = TRANSITION,
  defaultOpen,
  open,
  onOpenChange,
  variants,
  className,
  ...props
}: MorphingPopoverProps) {
  const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange });
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <MorphingPopoverContext.Provider value={{ ...popoverLogic, variants, triggerRef }}>
      <MotionConfig transition={transition}>
        <div
          className={cn('relative inline-flex items-center justify-center', className)}
          key={popoverLogic.uniqueId}
          {...props}
        >
          {children}
        </div>
      </MotionConfig>
    </MorphingPopoverContext.Provider>
  );
}

export type MorphingPopoverTriggerProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.button>;

function MorphingPopoverTrigger({
  children,
  className,
  asChild = false,
  ...props
}: MorphingPopoverTriggerProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context) {
    throw new Error(
      'MorphingPopoverTrigger must be used within MorphingPopover'
    );
  }

  if (asChild && isValidElement(children)) {
    const MotionComponent = motion.create(
      children.type as React.ForwardRefExoticComponent<Record<string, unknown>>
    );
    const childProps = children.props as Record<string, unknown>;

    return (
      <div ref={context.triggerRef} className="contents">
        <MotionComponent
          {...childProps}
          onClick={context.open}
          layoutId={`popover-trigger-${context.uniqueId}`}
          className={childProps.className}
          key={context.uniqueId}
          aria-expanded={context.isOpen}
          aria-controls={`popover-content-${context.uniqueId}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      key={context.uniqueId}
      layoutId={`popover-trigger-${context.uniqueId}`}
      onClick={context.open}
      ref={context.triggerRef}
    >
      <motion.button
        {...props}
        layoutId={`popover-label-${context.uniqueId}`}
        key={context.uniqueId}
        className={className}
        aria-expanded={context.isOpen}
        aria-controls={`popover-content-${context.uniqueId}`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

export type MorphingPopoverContentProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof motion.div>;

function MorphingPopoverContent({
  children,
  className,
  ...props
}: MorphingPopoverContentProps) {
  const context = useContext(MorphingPopoverContext);
  if (!context)
    throw new Error(
      'MorphingPopoverContent must be used within MorphingPopover'
    );

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, context.close);

  const [placeAbove, setPlaceAbove] = useState(false);

  useEffect(() => {
    if (!context.isOpen) return;
    const triggerEl = context.triggerRef.current;
    const contentEl = ref.current;
    if (!triggerEl || !contentEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If not enough space below, place above
    const estimatedContentHeight = contentEl.offsetHeight || 240;
    const fitsBelow = viewportHeight - triggerRect.bottom > estimatedContentHeight + 16;
    setPlaceAbove(!fitsBelow);
  }, [context.isOpen]);

  useEffect(() => {
    if (!context.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') context.close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context.isOpen, context.close]);

  // No body-level cursor toggle — the form fields handle their own native cursor
  // via data-cursor-native on the popover content wrapper

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          {...props}
          ref={ref}
          layoutId={`popover-trigger-${context.uniqueId}`}
          key={context.uniqueId}
          id={`popover-content-${context.uniqueId}`}
          role='dialog'
          aria-modal='true'
          data-cursor-native
          className={cn(
            'absolute overflow-hidden rounded-xl border border-zinc-950/10 bg-white p-2 text-zinc-950 shadow-xl dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50 right-0',
            placeAbove ? 'bottom-full mb-2' : 'top-full mt-2',
            className
          )}
          initial='initial'
          animate='animate'
          exit='exit'
          variants={context.variants ?? CONTENT_VARIANTS}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent };
