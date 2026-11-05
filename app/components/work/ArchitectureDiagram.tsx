'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import type { ArchitectureNodeKind, ProjectArchitecture } from '../../project-architecture';
import styles from './architecture-diagram.module.css';

const icons: Record<ArchitectureNodeKind, ReactNode> = {
  client: <path d="M4 5h16v10H4zM9 19h6M12 15v4" />,
  edge: <path d="m12 3 8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />,
  service: <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  worker: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2" /></>,
  data: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  queue: <path d="M4 6h16M4 12h16M4 18h10m3-2 3 2-3 2" />,
  external: <path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 8.5z" />,
};

type Box = { x: number; y: number; w: number; h: number; lane: number; order: number };
type Wire = { path: string; arrow: string; x: number; y: number; vertical: boolean };
type Geometry = { width: number; height: number; wires: (Wire | null)[] };

/** Side-to-side on wide layouts; top-to-bottom with outer routes for skipped mobile lanes. */
function connect(a: Box, b: Box, width: number, height: number, index: number): Wire {
  // In stacked lanes, route beside the cards so links never appear to join an unrelated node.
  const skipInLane = a.lane === b.lane && Math.abs(a.order - b.order) > 1;
  if ((width <= 800 && a.lane !== b.lane) || skipInLane) {
    const left = skipInLane ? Math.max(a.x + a.w, b.x + b.w) + 18 >= width : index % 2 === 0;
    const rail = skipInLane ? (left ? Math.min(a.x, b.x) - 12 : Math.max(a.x + a.w, b.x + b.w) + 12) : left ? 5 : width - 5;
    const sign = left ? 1 : -1;
    const sx = left ? a.x : a.x + a.w, sy = a.y + a.h / 2;
    const tx = (left ? b.x : b.x + b.w) - sign * 4, ty = b.y + b.h / 2;
    const down = ty > sy ? 1 : -1;
    return {
      path: `M${sx} ${sy}L${rail + sign * 6} ${sy}Q${rail} ${sy} ${rail} ${sy + down * 6}L${rail} ${ty - down * 6}Q${rail} ${ty} ${rail + sign * 6} ${ty}L${tx} ${ty}`,
      arrow: `M${tx - sign * 6} ${ty - 4}L${tx} ${ty}L${tx - sign * 6} ${ty + 4}`,
      x: rail, y: (sy + ty) / 2, vertical: true,
    };
  }
  const apart = a.x + a.w <= b.x || b.x + b.w <= a.x;
  let sx: number, sy: number, tx: number, ty: number;
  let c1: [number, number], c2: [number, number], arrow: string;
  if (apart) {
    const sign = b.x > a.x ? 1 : -1;
    sx = sign > 0 ? a.x + a.w : a.x;
    sy = a.y + a.h / 2;
    tx = (sign > 0 ? b.x : b.x + b.w) - sign * 4;
    ty = b.y + b.h / 2;
    if (Math.abs(a.lane - b.lane) > 1) {
      const startRail = sx + sign * 12, endRail = tx - sign * 8;
      const bottom = height + 12;
      return {
        path: `M${sx} ${sy}L${startRail - sign * 6} ${sy}Q${startRail} ${sy} ${startRail} ${sy + 6}L${startRail} ${bottom - 6}Q${startRail} ${bottom} ${startRail + sign * 6} ${bottom}L${endRail - sign * 6} ${bottom}Q${endRail} ${bottom} ${endRail} ${bottom - 6}L${endRail} ${ty + 6}Q${endRail} ${ty} ${endRail + sign * 6} ${ty}L${tx} ${ty}`,
        arrow: `M${tx - sign * 6} ${ty - 4}L${tx} ${ty}L${tx - sign * 6} ${ty + 4}`,
        x: (startRail + endRail) / 2, y: bottom, vertical: false,
      };
    }
    const bend = (tx - sx) / 2;
    c1 = [sx + bend, sy]; c2 = [tx - bend, ty];
    arrow = `M${tx - sign * 6} ${ty - 4}L${tx} ${ty}L${tx - sign * 6} ${ty + 4}`;
  } else {
    const sign = b.y > a.y ? 1 : -1;
    sx = a.x + a.w / 2;
    sy = sign > 0 ? a.y + a.h : a.y;
    tx = b.x + b.w / 2;
    ty = (sign > 0 ? b.y : b.y + b.h) - sign * 4;
    arrow = `M${tx - 4} ${ty - sign * 6}L${tx} ${ty}L${tx + 4} ${ty - sign * 6}`;
    const bend = (ty - sy) / 2;
    c1 = [sx, sy + bend]; c2 = [tx, ty - bend];
  }
  return {
    path: `M${sx} ${sy}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${tx} ${ty}`,
    arrow, x: (sx + 3 * c1[0] + 3 * c2[0] + tx) / 8,
    y: (sy + 3 * c1[1] + 3 * c2[1] + ty) / 8, vertical: !apart,
  };
}

const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeToMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const motionSnapshot = () => window.matchMedia(motionQuery).matches;
const serverMotionSnapshot = () => true;

export function ArchitectureDiagram({ architecture, standalone = false }: { architecture: ProjectArchitecture; standalone?: boolean }) {
  const id = useId();
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef(new Map<string, HTMLLIElement>());
  const [geometry, setGeometry] = useState<Geometry>({ width: 0, height: 0, wires: [] });
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, serverMotionSnapshot);
  const allNodes = architecture.lanes.flatMap((lane) => lane.nodes);
  const hasAsync = architecture.edges.some((edge) => edge.async);
  const nameOf = (nodeId: string) => allNodes.find((node) => node.id === nodeId)?.label ?? nodeId;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (disposed || !canvas.clientWidth || !canvas.clientHeight) return;
      const base = canvas.getBoundingClientRect();
      // Normalize the modal's opening scale; an animation-end measure settles rotation.
      const scaleX = base.width / canvas.clientWidth || 1;
      const scaleY = base.height / canvas.clientHeight || 1;
      const box = (nodeId: string): Box | null => {
        const node = nodesRef.current.get(nodeId);
        if (!node) return null;
        const r = node.getBoundingClientRect();
        return { x: (r.x - base.x) / scaleX, y: (r.y - base.y) / scaleY, w: r.width / scaleX, h: r.height / scaleY, lane: Number(node.dataset.lane), order: Number(node.dataset.order) };
      };
      const next = {
        width: canvas.clientWidth, height: canvas.clientHeight,
        wires: architecture.edges.map((edge, index) => {
          const from = box(edge.from), to = box(edge.to);
          return from && to ? connect(from, to, canvas.clientWidth, canvas.clientHeight, index) : null;
        }),
      };
      setGeometry((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    nodesRef.current.forEach((node) => observer.observe(node));
    const dialog = canvas.closest('dialog');
    dialog?.addEventListener('animationend', schedule);
    document.fonts?.ready.then(schedule, () => {});
    measure();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); dialog?.removeEventListener('animationend', schedule); };
  }, [architecture]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);

  const connected = new Set(active ? [active, ...architecture.edges.filter((edge) => edge.from === active || edge.to === active).flatMap((edge) => [edge.from, edge.to])] : []);

  return (
    <section className={styles.section} data-standalone={standalone ? '' : undefined} aria-labelledby={`${id}-title`} data-project-architecture="">
      <p className={styles.eyebrow}><span>03</span> System architecture</p>
      <h3 id={`${id}-title`} className={styles.title}>{architecture.caption.title}</h3>
      <p className={styles.lead}>{architecture.caption.description}</p>
      <div className={styles.stage}>
        <div ref={canvasRef} className={styles.canvas} data-animate={visible && !reducedMotion ? '' : undefined} onPointerLeave={() => setActive(null)}>
          <svg className={styles.wires} width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width || 1} ${geometry.height || 1}`} aria-hidden="true" focusable="false">
            {architecture.edges.map((edge, index) => {
              const wire = geometry.wires[index];
              if (!wire) return null;
              const dim = active && edge.from !== active && edge.to !== active;
              return (
                <g key={`${edge.from}-${edge.to}-${index}`} className={styles.wire} data-async={edge.async ? '' : undefined} data-dim={dim ? '' : undefined}>
                  <path className={styles.line} d={wire.path} />
                  <path className={styles.arrow} d={wire.arrow} />
                  {visible && !reducedMotion ? <circle className={styles.packet} r="2.5">
                    <animateMotion dur={edge.async ? '4s' : '3s'} begin={`${-(index * 0.37)}s`} repeatCount="indefinite" path={wire.path} />
                  </circle> : null}
                </g>
              );
            })}
          </svg>
          <div className={styles.lanes} style={{ '--lanes': architecture.lanes.length } as CSSProperties}>
            {architecture.lanes.map((lane, laneIndex) => (
              <div key={lane.label} className={styles.lane}>
                <h4 className={styles.laneLabel}>{lane.label}</h4>
                <ul className={styles.nodes}>
                  {lane.nodes.map((node, nodeIndex) => <li key={node.id} ref={(element) => { if (element) nodesRef.current.set(node.id, element); else nodesRef.current.delete(node.id); }} data-node={node.id} data-lane={laneIndex} data-order={nodeIndex} data-kind={node.kind} data-dim={active && !connected.has(node.id) ? '' : undefined} data-active={active === node.id ? '' : undefined} className={styles.node} onPointerEnter={() => setActive(node.id)}>
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{icons[node.kind]}</svg>
                    <span><span className={styles.nodeLabel}>{node.label}</span>{node.note ? <span className={styles.note}>{node.note}</span> : null}</span>
                  </li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.edgeLabels} aria-hidden="true">
            {architecture.edges.map((edge, index) => {
              const wire = geometry.wires[index];
              return edge.label && wire ? <span key={index} className={styles.edgeLabel} data-vertical={wire.vertical ? '' : undefined} data-dim={active && edge.from !== active && edge.to !== active ? '' : undefined} style={{ left: wire.x, top: wire.y }}>{edge.label}</span> : null;
            })}
          </div>
        </div>
        <ul className={styles.legend} aria-label="Connection types">
          <li><span />Direct flow</li>
          {hasAsync ? <li><span className={styles.asyncSwatch} />Async / queued</li> : null}
        </ul>
        <details className={styles.connections}>
          <summary>View connections <span>{architecture.edges.length} links</span></summary>
          <ul>{architecture.edges.map((edge, index) => <li key={index}>{nameOf(edge.from)} <span aria-hidden="true">→</span><span className="visually-hidden"> to </span> {nameOf(edge.to)}{edge.label ? ` · ${edge.label}` : ''}{edge.async ? ' · async / queued' : ''}</li>)}</ul>
        </details>
      </div>
    </section>
  );
}
