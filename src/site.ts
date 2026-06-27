/**
 * Site-wide constants. Single source of truth for the two-track architecture,
 * track icons (one fixed icon per track, used everywhere — Layer 2.4), and
 * contact details. Pages and chrome read from here so nothing drifts.
 *
 * Contact details below are placeholders for the real build — swap in once
 * confirmed. Nothing here claims scale or volume (Layer 3.6 guardrail).
 */
export const SITE = {
  name: 'Beacon Diagnostics',
  email: 'hello@beacondiagnostics.com',
  phone: '+1 (000) 000-0000',
};

/**
 * Prefix an absolute app path with the configured base (import.meta.env.BASE_URL
 * is "/" locally and "/Beacon-Diagnostics/" on GitHub Pages). Use for every
 * internal link and asset so both deploy modes resolve correctly.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // '' locally, '/Beacon-Diagnostics' on Pages
export const withBase = (path: string): string =>
  path === '/' ? `${BASE}/` : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;

export type TrackId = 'imaging' | 'cardiac';

export const TRACKS: Record<
  TrackId,
  { id: TrackId; label: string; navLabel: string; href: string; icon: string; blurb: string }
> = {
  imaging: {
    id: 'imaging',
    label: 'Imaging QC & Compliance',
    navLabel: 'Imaging QC & Compliance',
    href: withBase('/imaging-qc'),
    icon: 'ruler', // calibration — the imaging/QC track's fixed icon (2.4)
    blurb: 'Mammography, MRI, and multi-site compliance — calibration and QC you can stand behind.',
  },
  cardiac: {
    id: 'cardiac',
    label: 'Cardiac Services',
    navLabel: 'Cardiac Services',
    href: withBase('/cardiac'),
    icon: 'monitor', // broadcast/signal — NOT a heartbeat glyph (Layer 1)
    blurb: 'Holter monitoring, CIED support, and remote monitoring — clarity quicker, refer smarter.',
  },
};

export const TRACK_ORDER: TrackId[] = ['imaging', 'cardiac'];
