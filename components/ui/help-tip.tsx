'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle } from 'lucide-react';

interface HelpTipProps {
  text: string;
  className?: string;
}

export function HelpTip({ text, className = '' }: HelpTipProps) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLSpanElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const updatePos = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, []);

  const handleShow = useCallback(() => {
    updatePos();
    setShow(true);
  }, [updatePos]);

  const tooltip = show && mounted ? createPortal(
    <div
      className="fixed z-[200] pointer-events-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y - 8}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="w-56 p-2.5 rounded-lg bg-foreground text-background text-[11px] leading-relaxed shadow-xl">
        {text}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-foreground" />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <span className={`inline-flex ${className}`}>
      <span
        ref={btnRef}
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleShow(); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); handleShow(); } }}
        onMouseEnter={handleShow}
        onMouseLeave={() => setShow(false)}
        className="h-5 w-5 rounded-full bg-background border border-border text-foreground inline-flex items-center justify-center hover:bg-muted transition-colors shadow-sm cursor-pointer"
        aria-label="Help"
      >
        <HelpCircle className="h-3 w-3" />
      </span>
      {tooltip}
    </span>
  );
}
