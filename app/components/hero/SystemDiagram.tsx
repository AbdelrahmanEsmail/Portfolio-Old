import Image from 'next/image';
import type { CSSProperties } from 'react';
import { site, systemLog } from '../../content';
import { Icon } from '../ui/Icon';
import {
  LOG,
  LOG_SM,
  NODES,
  PORTRAIT,
  PORTRAIT_SM,
  ROUTES,
  ROUTES_SM,
  STAGE,
  STAGE_SM,
  boxVars,
  roundedRoute,
  type Box,
  type Route,
} from './diagram';
import styles from './diagram.module.css';
import { SystemLog } from './SystemLog';

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Registration marks just outside the portrait corners, like a print proof. */
function cropMarks({ x, y, w, h }: Box) {
  const gap = 9;
  const len = 11;
  const corners: [number, number, number, number][] = [
    [x - gap, y - gap, 1, 1],
    [x + w + gap, y - gap, -1, 1],
    [x - gap, y + h + gap, 1, -1],
    [x + w + gap, y + h + gap, -1, -1],
  ];
  return corners.map(([cx, cy, dx, dy]) => `M${cx + dx * len} ${cy} H${cx} V${cy + dy * len}`).join(' ');
}

/**
 * One request (lime, portrait → service) and one response (periwinkle, back)
 * per route, as SMIL motion along the wire. Hidden for reduced motion and
 * paused off-screen by HeroShell.
 */
function Packets({ pathId, dur, begin }: { pathId: string; dur: number; begin: number }) {
  const timing = { dur: `${dur}s`, begin: `${begin}s`, repeatCount: 'indefinite' };
  return (
    <>
      <g className={styles.packet} data-tone="lime" opacity={0}>
        <circle r={7} className={styles.packetHalo} />
        <circle r={2.6} className={styles.packetCore} />
        <animateMotion {...timing} calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.04;0.4;1">
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate attributeName="opacity" {...timing} values="0;0;1;1;0;0" keyTimes="0;0.04;0.07;0.36;0.4;1" />
      </g>
      <g className={styles.packet} data-tone="peri" opacity={0}>
        <circle r={7} className={styles.packetHalo} />
        <circle r={2.6} className={styles.packetCore} />
        <animateMotion {...timing} calcMode="linear" keyPoints="1;1;0;0" keyTimes="0;0.52;0.88;1">
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate attributeName="opacity" {...timing} values="0;0;1;1;0;0" keyTimes="0;0.52;0.56;0.85;0.88;1" />
      </g>
    </>
  );
}

function Wires({
  routes,
  stage,
  portrait,
  variant,
}: {
  routes: Route[];
  stage: { w: number; h: number };
  portrait: Box;
  variant: 'lg' | 'sm';
}) {
  return (
    <svg
      className={`${styles.wires} ${variant === 'lg' ? styles.wiresLg : styles.wiresSm}`}
      viewBox={`0 0 ${stage.w} ${stage.h}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={cropMarks(portrait)} className={styles.cropMarks} />
      {routes.map((route, index) => {
        const d = roundedRoute(route.points);
        const pathId = `hero-wire-${variant}-${route.id}`;
        const [sx, sy] = route.points[0];
        return (
          <g key={route.id} className={styles.route} data-tone={route.tone} style={{ '--i': index } as Vars}>
            <path d={d} className={styles.wireGlow} />
            <path d={d} id={pathId} className={styles.wire} pathLength={1} />
            <text x={route.labelAt[0]} y={route.labelAt[1]} className={styles.wireLabel} textAnchor="middle">
              {route.label}
            </text>
            <Packets pathId={pathId} dur={route.dur} begin={route.begin} />
            <circle cx={sx} cy={sy} r={4.2} className={styles.junction} />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * The hero's signature visual: Zeyad's portrait as the core of a small live
 * system — four services wired to it with signal lines, request/response
 * packets, and a tailing log console. Only the portrait is exposed to
 * assistive tech; everything else is decorative.
 */
export function SystemDiagram() {
  const stageVars = {
    '--W': STAGE.w,
    '--H': STAGE.h,
    '--Wsm': STAGE_SM.w,
    '--Hsm': STAGE_SM.h,
  } as Vars;

  return (
    <div className={styles.stage} style={stageVars}>
      <div className={styles.halo} aria-hidden="true" />

      <div className={`${styles.layer} ${styles.layerMid}`}>
        <div className={`${styles.box} ${styles.portrait}`} style={boxVars(PORTRAIT, PORTRAIT_SM)}>
          <div className={styles.photo}>
            <Image
              src={site.portrait}
              alt="Portrait of Zeyad Salama in a light-grey suit, photographed outdoors at night"
              fill
              priority
              sizes="(max-width: 640px) 52vw, 290px"
              className={styles.photoImg}
            />
            <div className={styles.photoShade} aria-hidden="true" />
            <div className={styles.photoBar} aria-hidden="true">
              <span className={styles.photoBarDot} />
              <span className={styles.photoBarText}>
                <span className={styles.photoBarUser}>zeyad@mansoura</span> <span className={styles.photoBarPath}>~</span> online
              </span>
              <span className={styles.caret} />
            </div>
          </div>
        </div>

        <Wires routes={ROUTES} stage={STAGE} portrait={PORTRAIT} variant="lg" />
        <Wires routes={ROUTES_SM} stage={STAGE_SM} portrait={PORTRAIT_SM} variant="sm" />

        <div aria-hidden="true">
          {NODES.map((node) => (
            <div
              key={node.id}
              className={`${styles.box} ${styles.nodeSlot}`}
              data-sm={node.sm ? '' : undefined}
              data-port={node.port}
              data-port-sm={node.sm?.port}
              style={
                {
                  ...boxVars(node.box, node.sm?.box),
                  '--port-x': node.portX,
                  '--port-x-sm': node.sm?.portX ?? node.portX,
                  '--enter': `${node.enter}ms`,
                  '--float-dur': `${node.float[0]}s`,
                  '--float-delay': `${node.float[1]}s`,
                  '--face': node.face,
                } as Vars
              }
            >
              <div className={styles.nodeFloat}>
                <div className={styles.node} data-tone={node.tone}>
                  <span className={styles.nodeIcon}>
                    <Icon name={node.icon} size={16} />
                  </span>
                  <span className={styles.nodeText}>
                    <span className={styles.nodeSub}>{node.sub}</span>
                    <span className={styles.nodeTitle}>{node.title}</span>
                  </span>
                  <span className={styles.nodeLed} />
                  <span className={styles.nodePort} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.layer} ${styles.layerFront}`}>
        <SystemLog lines={systemLog} className={`${styles.box} ${styles.log}`} style={boxVars(LOG, LOG_SM)} />
      </div>
    </div>
  );
}
