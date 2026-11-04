import styles from './visuals.module.css';

/*
 * Decorative ERD for the Backend card: tenants → orders → ledger_entries,
 * relation lines with junction dots, packets travelling along them, a brass
 * transaction boundary, and a row-level lock (SELECT … FOR UPDATE) on the
 * ledger row being written. Pure SVG + CSS animation; hidden from assistive tech.
 */

const HEAD = 34;
const ROW = 26;

type Column = { name: string; type: string; key?: 'PK' | 'FK'; locked?: boolean };
type Table = { name: string; x: number; y: number; w: number; tone: 'peri' | 'brass' | 'lime'; columns: Column[] };

const tables: Table[] = [
  {
    name: 'tenants',
    x: 8,
    y: 22,
    w: 170,
    tone: 'peri',
    columns: [
      { name: 'id', type: 'uuid', key: 'PK' },
      { name: 'schema_name', type: 'text' },
      { name: 'domain', type: 'text' },
    ],
  },
  {
    name: 'orders',
    x: 246,
    y: 190,
    w: 176,
    tone: 'brass',
    columns: [
      { name: 'id', type: 'bigint', key: 'PK' },
      { name: 'tenant_id', type: 'uuid', key: 'FK' },
      { name: 'total', type: 'numeric' },
      { name: 'status', type: 'text' },
    ],
  },
  {
    name: 'ledger_entries',
    x: 466,
    y: 100,
    w: 170,
    tone: 'lime',
    columns: [
      { name: 'id', type: 'bigint', key: 'PK' },
      { name: 'order_id', type: 'bigint', key: 'FK' },
      { name: 'amount', type: 'numeric', locked: true },
      { name: 'posted_at', type: 'date' },
    ],
  },
];

// tenants.id → orders.tenant_id, orders.id → ledger_entries.order_id (rounded orthogonal routes).
const toOrders = 'M178 69 H190 Q200 69 200 79 V253 Q200 263 210 263 H246';
const toLedger = 'M422 237 H434 Q444 237 444 227 V183 Q444 173 454 173 H466';

const toneClass = {
  peri: styles.tonePeri,
  brass: styles.toneBrass,
  lime: styles.toneLime,
} as const;

function TableShape({ table }: { table: Table }) {
  const { x, y, w, name, columns, tone } = table;
  const h = HEAD + columns.length * ROW;

  return (
    <g transform={`translate(${x} ${y})`} className={toneClass[tone]}>
      <rect className={styles.tbl} x={0.5} y={0.5} width={w - 1} height={h - 1} rx={12} />
      <path className={styles.tblHead} d={`M0.5 12 A11.5 11.5 0 0 1 12 0.5 H${w - 12} A11.5 11.5 0 0 1 ${w - 0.5} 12 V${HEAD} H0.5 Z`} />
      <path className={styles.tblEdge} d={`M16 0.5 H${w - 16}`} />
      <rect className={styles.tblGlyph} x={14} y={13.5} width={7} height={7} rx={2} />
      <text className={styles.tblName} x={29} y={21.5}>
        {name}
      </text>
      <path className={styles.tblRule} d={`M0.5 ${HEAD} H${w - 0.5}`} />

      {columns.map((column, index) => {
        const top = HEAD + index * ROW;
        return (
          <g key={column.name} transform={`translate(0 ${top})`}>
            {column.locked ? (
              <>
                <rect className={styles.lockedRow} x={1} y={0.5} width={w - 2} height={ROW - 1} />
                <rect className={styles.lockedFlash} x={1} y={0.5} width={w - 2} height={ROW - 1} />
                <rect className={styles.lockedBar} x={1} y={4} width={2.5} height={ROW - 8} rx={1.25} />
              </>
            ) : null}
            {index > 0 ? <path className={styles.rowRule} d={`M12 0 H${w - 12}`} /> : null}
            {column.key ? (
              <text className={column.key === 'PK' ? styles.keyPk : styles.keyFk} x={14} y={16.5}>
                {column.key}
              </text>
            ) : null}
            <text className={styles.colName} x={36} y={17}>
              {column.name}
            </text>
            <text className={styles.colType} x={column.locked ? w - 20 : w - 14} y={17} textAnchor="end">
              {column.type}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function SchemaDiagram() {
  return (
    <div className={styles.schema} aria-hidden="true">
      <div className={styles.schemaBar}>
        <span>schema · public</span>
        <span className={styles.schemaKeys}>
          <span className={styles.legendPk}>PK</span>
          <span className={styles.legendFk}>FK</span>
          <span className={styles.legendLock}>Lock</span>
        </span>
      </div>
      <div className={styles.schemaStage}>
        <svg className={styles.schemaSvg} viewBox="0 0 660 360" focusable="false">
          {/* Transaction boundary: the order and its ledger rows commit together. */}
          <rect className={styles.txn} x={222} y={70} width={430} height={282} rx={22} />
          <rect className={styles.txnTab} x={240} y={60.5} width={150} height={19} rx={9.5} />
          <text className={styles.txnLabel} x={315} y={73.5} textAnchor="middle">
            transaction.atomic()
          </text>

          {/* Relation lines (under the tables so the junctions sit on the edges). */}
          <path className={`${styles.rel} ${styles.relPeri}`} d={toOrders} />
          <path className={`${styles.rel} ${styles.relLime}`} d={toLedger} />

          {tables.map((table) => (
            <TableShape key={table.name} table={table} />
          ))}

          {/* Packets: a short glowing dash travelling each relation. */}
          <g className={styles.packets}>
            <path className={`${styles.packetHalo} ${styles.relPeri} ${styles.packetA}`} d={toOrders} pathLength={100} />
            <path className={`${styles.packet} ${styles.relPeri} ${styles.packetA}`} d={toOrders} pathLength={100} />
            <path className={`${styles.packetHalo} ${styles.relLime} ${styles.packetB}`} d={toLedger} pathLength={100} />
            <path className={`${styles.packet} ${styles.relLime} ${styles.packetB}`} d={toLedger} pathLength={100} />
          </g>

          {/* Junction dots on the table edges. */}
          <g>
            <circle className={`${styles.junction} ${styles.relPeri}`} cx={178} cy={69} r={3.5} />
            <circle className={`${styles.junctionEnd} ${styles.relPeri}`} cx={246} cy={263} r={3.5} />
            <circle className={`${styles.junction} ${styles.relLime}`} cx={422} cy={237} r={3.5} />
            <circle className={`${styles.junctionEnd} ${styles.relLime}`} cx={466} cy={173} r={3.5} />
          </g>

          {/* Row-level lock on ledger_entries.amount. */}
          <g transform="translate(636 199)">
            <circle className={styles.lockRing} r={11} />
            <circle className={styles.lockBadge} r={11} />
            <path className={styles.lockGlyph} d="M-3.2 -1.2 V-3.4 A3.2 3.2 0 0 1 3.2 -3.4 V-1.2" />
            <rect className={styles.lockBody} x={-4.8} y={-1.4} width={9.6} height={7} rx={1.6} />
          </g>
          <text className={styles.note} x={468} y={264}>
            SELECT … FOR UPDATE
          </text>
          <text className={styles.noteMuted} x={468} y={282}>
            -- row-level lock
          </text>
        </svg>
      </div>
    </div>
  );
}
