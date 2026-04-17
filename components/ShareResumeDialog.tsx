'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { encodeResume, ShareLinkTooLargeError } from '@/lib/shareLink';
import { SITE_URL } from '@/lib/siteConfig';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShareResumeDialog({ open, onOpenChange }: Props) {
  const { resumeData } = useResumeStore();
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tooLargeError, setTooLargeError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // Intentional: reset UI state then kick off async encode when dialog opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setCopied(false);
    setTooLargeError(null);
    encodeResume(resumeData)
      .then((payload) => {
        // Use window.origin in dev so the link works locally; SITE_URL in prod.
        const base = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
        setUrl(`${base}/r#${payload}`);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err instanceof ShareLinkTooLargeError) {
          setTooLargeError(err.message);
        } else {
          setTooLargeError('Failed to generate share link. Please try again.');
        }
      });
  }, [open, resumeData]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const urlLen = url.length;
  const tooLong = urlLen > 2000;
  const base = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
  const payloadLen = urlLen - (base.length + '/r#'.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Resume
          </DialogTitle>
          <DialogDescription>
            Read-only link with your full resume encoded in the URL fragment. No backend, no sign-up for the recipient.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {tooLargeError ? (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-900">
              <p className="flex items-center gap-1.5 font-semibold mb-1">
                <AlertTriangle className="h-4 w-4" /> Resume too large to share as a link
              </p>
              <p className="text-xs">{tooLargeError}</p>
            </div>
          ) : (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
              <p className="flex items-center gap-1.5 font-semibold mb-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Your data lives in the URL
              </p>
              <p>
                Anyone with this link can view your resume. Fragment ({url.split('#')[1]?.slice(0, 10) || ''}...) is never sent to our servers, but share only with people you trust.
              </p>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Link</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={loading ? 'Generating…' : url}
                className="flex-1 text-xs font-mono px-3 py-2 border rounded-md bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" onClick={copy} disabled={loading} className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              URL length: {urlLen} chars · Payload: {payloadLen} chars
              {tooLong && (
                <span className="text-amber-700 ml-2">
                  ⚠ Long — some email clients may truncate
                </span>
              )}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>Close</DialogClose>
          <Button size="sm" disabled={loading || !url} onClick={() => window.open(url, '_blank')} className="gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" /> Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
