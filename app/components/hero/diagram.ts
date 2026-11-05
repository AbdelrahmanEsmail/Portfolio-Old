import type { CSSProperties } from 'react';
import type { IconName } from '../ui/Icon';

/*
 * Geometry for the hero "system diagram".
 *
 * Everything is laid out in design units on a fixed stage (desktop 560×620,
 * small screens 360×500). HTML panels are positioned with percentages of the
 * same numbers and the SVG wiring uses them as its viewBox, so lines, ports and
 * panels stay aligned at any rendered size.
 */

export type Point = readonly [number, number];
export type Box = { x: number; y: number; w: number; h: number };
export type Tone = 'lime' | 'peri';

export const STAGE = { w: 560, h: 620 } as const;
export const STAGE_SM = { w: 360, h: 500 } as const;

export const PORTRAIT: Box = { x: 172, y: 92, w: 252, h: 338 };
export const PORTRAIT_SM: Box = { x: 88, y: 70, w: 184, h: 244 };

export const LOG: Box = { x: 8, y: 412, w: 412, h: 200 };
export const LOG_SM: Box = { x: 0, y: 298, w: 360, h: 196 };

export type ServiceNode = {
  id: 'api' | 'db' | 'frontend' | 'platform';
  icon: IconName;
  title: string;
  sub: string;
  tone: Tone;
  /** Which edge the signal line plugs into. */
  port: 'top' | 'bottom';
  box: Box;
  /** Position of the port along the node's width (0–1). */
  portX: number;
  /** Small-screen layout; nodes without one are hidden below 640px. */
  sm?: { box: Box; portX: number; port: 'top' | 'bottom' };
  /** Float loop: duration and phase offset (s). */
  float: [number, number];
  /** Entrance delay (ms). */
  enter: number;
  /** Tilt direction: nodes face the portrait. */
  face: 1 | -1;
};

export const NODES: ServiceNode[] = [
  {
    id: 'api',
    icon: 'braces',
    title: 'Django REST',
    sub: 'API',
    tone: 'lime',
    port: 'bottom',
    box: { x: 0, y: 20, w: 168, h: 58 },
    portX: 0.5,
    sm: { box: { x: 0, y: 0, w: 150, h: 52 }, portX: 0.3, port: 'bottom' },
    float: [7.2, -1.4],
    enter: 1050,
    face: 1,
  },
  {
    id: 'frontend',
    icon: 'layout',
    title: 'React + Next.js',
    sub: 'Frontend',
    tone: 'peri',
    port: 'bottom',
    box: { x: 392, y: 0, w: 168, h: 58 },
    portX: 0.5,
    sm: { box: { x: 210, y: 12, w: 150, h: 52 }, portX: 0.72, port: 'bottom' },
    float: [6.4, -3.1],
    enter: 1150,
    face: -1,
  },
  {
    id: 'db',
    icon: 'database',
    title: 'PostgreSQL',
    sub: 'Database',
    tone: 'peri',
    port: 'top',
    box: { x: 0, y: 292, w: 168, h: 58 },
    portX: 0.5,
    float: [8, -5.2],
    enter: 1250,
    face: 1,
  },
  {
    id: 'platform',
    icon: 'server',
    title: 'Docker + CI/CD',
    sub: 'Platform',
    tone: 'lime',
    port: 'top',
    box: { x: 392, y: 300, w: 168, h: 58 },
    portX: 0.5,
    float: [6.8, -2.2],
    enter: 1350,
    face: -1,
  },
];

export type Route = {
  id: string;
  tone: Tone;
  /** Short protocol label drawn along the first segment. */
  label: string;
  labelAt: Point;
  /** Orthogonal polyline from the portrait port to (just under) the node port. */
  points: Point[];
  /** Packet loop timing (s). */
  dur: number;
  begin: number;
};

/** Desktop wiring. Each route starts on the portrait frame and ends 10 units under its node. */
export const ROUTES: Route[] = [
  { id: 'api', tone: 'lime', label: 'HTTP', labelAt: [128, 142], points: [[172, 152], [84, 152], [84, 68]], dur: 4.6, begin: 2.4 },
  { id: 'frontend', tone: 'peri', label: 'UI', labelAt: [446, 132], points: [[424, 140], [476, 140], [476, 48]], dur: 3.8, begin: 3 },
  { id: 'db', tone: 'peri', label: 'SQL', labelAt: [128, 238], points: [[172, 246], [84, 246], [84, 302]], dur: 5.2, begin: 3.5 },
  { id: 'platform', tone: 'lime', label: 'SHIP', labelAt: [450, 222], points: [[424, 230], [476, 230], [476, 310]], dur: 6, begin: 4.1 },
];

export const ROUTES_SM: Route[] = [
  { id: 'api', tone: 'lime', label: 'HTTP', labelAt: [64, 146], points: [[88, 154], [45, 154], [45, 42]], dur: 4.6, begin: 2.4 },
  { id: 'frontend', tone: 'peri', label: 'UI', labelAt: [296, 160], points: [[272, 168], [318, 168], [318, 54]], dur: 5.2, begin: 3.2 },
];

/** Orthogonal polyline → SVG path with softly rounded corners. */
export function roundedRoute(points: readonly Point[], radius = 16): string {
  const fmt = (n: number) => Number(n.toFixed(2));
  const [start] = points;
  let d = `M${fmt(start[0])} ${fmt(start[1])}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const ax = cx - ((cx - px) / inLen) * r;
    const ay = cy - ((cy - py) / inLen) * r;
    const bx = cx + ((nx - cx) / outLen) * r;
    const by = cy + ((ny - cy) / outLen) * r;
    d += ` L${fmt(ax)} ${fmt(ay)} Q${fmt(cx)} ${fmt(cy)} ${fmt(bx)} ${fmt(by)}`;
  }
  const end = points[points.length - 1];
  d += ` L${fmt(end[0])} ${fmt(end[1])}`;
  return d;
}

/** Inline CSS custom properties that place a box on the stage (see .box in diagram.module.css). */
export function boxVars(box: Box, sm?: Box): CSSProperties {
  return {
    '--x': box.x,
    '--y': box.y,
    '--w': box.w,
    '--h': box.h,
    ...(sm ? { '--sx': sm.x, '--sy': sm.y, '--sw': sm.w, '--sh': sm.h } : {}),
  } as CSSProperties;
}
