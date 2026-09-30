"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

// Essay charts. Two forms:
//   <Chart type="bar" data={[{ label: "2019", value: 12 }, ...]} />       one series, categories
//   <Chart type="line" series={[{ name: "WNBA", points: [{ x: 2019, y: 1.2 }, ...] }]} />  up to 3 series over time
// Colors come from a palette validated for color-blind readers; order is fixed, never cycled.

const SERIES_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];
const MAX_SERIES = SERIES_COLORS.length;

type Common = {
  title: string;
  subtitle?: string;
  source?: string;
  prefix?: string; // e.g. "$"
  unit?: string; // e.g. "%", "M"
};
type BarProps = Common & { type: "bar"; data: { label: string; value: number }[]; highlight?: string };
type LineProps = Common & {
  type: "line";
  series: { name: string; points: { x: string | number; y: number }[] }[];
};
export type ChartProps = BarProps | LineProps;

const M = { top: 16, right: 16, bottom: 34, left: 48 };

function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0];
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.001; v += step) ticks.push(Number(v.toPrecision(12)));
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + step);
  return ticks;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export default function Chart(props: ChartProps) {
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  const fmt = (v: number) =>
    `${props.prefix ?? ""}${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}${props.unit ?? ""}`;

  const height = width < 480 ? 260 : 320;
  const isLine = props.type === "line";
  const series = isLine ? props.series.slice(0, MAX_SERIES) : [];

  // Line charts reserve room on the right for direct end labels.
  const right = isLine ? Math.min(120, Math.max(72, width * 0.18)) : M.right;
  const innerW = Math.max(width - M.left - right, 10);
  const innerH = height - M.top - M.bottom;

  const categories = useMemo<string[]>(
    () => (props.type === "bar" ? props.data.map((d) => d.label) : (props.series[0]?.points ?? []).map((p) => String(p.x))),
    [props],
  );
  const maxY = useMemo(() => {
    const vals = props.type === "bar" ? props.data.map((d) => d.value) : props.series.flatMap((s) => s.points.map((p) => p.y));
    return Math.max(0, ...vals);
  }, [props]);
  const ticks = niceTicks(maxY);
  const top = ticks[ticks.length - 1] || 1;
  const y = (v: number) => M.top + innerH - (v / top) * innerH;

  const n = categories.length;
  const band = innerW / Math.max(n, 1);
  const barW = Math.max(Math.min(band * 0.62, 56), 4);
  const xBar = (i: number) => M.left + i * band + (band - barW) / 2;
  const xPt = (i: number) => M.left + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const xCenter = (i: number) => (isLine ? xPt(i) : xBar(i) + barW / 2);

  // Show every category label when they fit, otherwise every k-th.
  const labelEvery = Math.max(1, Math.ceil((n * 44) / innerW));

  function onPointer(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let best = 0;
    for (let i = 1; i < n; i++) if (Math.abs(xCenter(i) - px) < Math.abs(xCenter(best) - px)) best = i;
    setActive(best);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setActive((a) => Math.min((a ?? -1) + 1, n - 1));
    else if (e.key === "ArrowLeft") setActive((a) => Math.max((a ?? n) - 1, 0));
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  }

  // Direct labels at the end of each line, nudged apart so they never collide.
  const endLabels = useMemo(() => {
    if (!isLine) return [];
    const items = series
      .map((s, i) => ({ name: s.name, i, y: y(s.points[s.points.length - 1]?.y ?? 0) }))
      .sort((a, b) => a.y - b.y);
    for (let k = 1; k < items.length; k++) items[k].y = Math.max(items[k].y, items[k - 1].y + 16);
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLine, series, top, innerH]);

  const readout =
    active === null
      ? null
      : props.type === "bar"
        ? [{ name: props.data[active].label, value: props.data[active].value, color: SERIES_COLORS[0] }]
        : series.map((s, i) => ({ name: s.name, value: s.points[active]?.y, color: SERIES_COLORS[i] }));

  const summary =
    props.type === "bar"
      ? `Bar chart: ${props.title}. ${props.data.map((d) => `${d.label} ${fmt(d.value)}`).join(", ")}.`
      : `Line chart: ${props.title}, ${series.map((s) => s.name).join(", ")} from ${categories[0]} to ${categories[n - 1]}.`;

  return (
    <figure className="my-12 font-sans">
      <figcaption>
        <p className="text-[1.05rem] font-semibold leading-snug text-ink">{props.title}</p>
        {props.subtitle && <p className="mt-1 text-[0.9rem] text-ink-2">{props.subtitle}</p>}
      </figcaption>

      {isLine && series.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.85rem] text-ink-2" aria-label="Legend">
          {series.map((s, i) => (
            <li key={s.name} className="flex items-center gap-2">
              <span aria-hidden className="h-[3px] w-4 rounded-full" style={{ background: SERIES_COLORS[i] }} />
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <div ref={wrapRef} className="relative mt-4">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={summary}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerMove={onPointer}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
          className="block touch-pan-y overflow-visible outline-offset-4"
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={M.left + innerW} y1={y(t)} y2={y(t)} style={{ stroke: t === 0 ? "var(--ink-3)" : "var(--grid)" }} strokeWidth={1} />
              <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="tabular-nums" style={{ fill: "var(--ink-3)", fontSize: 11 }}>
                {fmt(t)}
              </text>
            </g>
          ))}

          {categories.map((c, i) =>
            i % labelEvery === 0 || i === n - 1 ? (
              <text key={c + i} x={xCenter(i)} y={M.top + innerH + 20} textAnchor="middle" style={{ fill: "var(--ink-3)", fontSize: 11 }}>
                {c}
              </text>
            ) : null,
          )}

          {props.type === "bar" &&
            props.data.map((d, i) => {
              const x0 = xBar(i);
              const y0 = y(d.value);
              const r = Math.min(4, barW / 2, (M.top + innerH - y0) / 2);
              const base = M.top + innerH;
              const muted = props.highlight && props.highlight !== d.label;
              const path = `M${x0},${base} V${y0 + r} Q${x0},${y0} ${x0 + r},${y0} H${x0 + barW - r} Q${x0 + barW},${y0} ${x0 + barW},${y0 + r} V${base} Z`;
              return (
                <g key={d.label}>
                  <path d={path} style={{ fill: muted ? "var(--ink-3)" : SERIES_COLORS[0], opacity: muted ? 0.35 : active === null || active === i ? 1 : 0.55 }} />
                  {props.highlight === d.label && (
                    <text x={x0 + barW / 2} y={y0 - 8} textAnchor="middle" className="tabular-nums" style={{ fill: "var(--ink)", fontSize: 12, fontWeight: 600 }}>
                      {fmt(d.value)}
                    </text>
                  )}
                </g>
              );
            })}

          {isLine && active !== null && (
            <line x1={xPt(active)} x2={xPt(active)} y1={M.top} y2={M.top + innerH} style={{ stroke: "var(--ink-3)" }} strokeDasharray="3 3" strokeWidth={1} />
          )}

          {isLine &&
            series.map((s, si) => (
              <g key={s.name}>
                <path
                  d={s.points.map((p, i) => `${i ? "L" : "M"}${xPt(i)},${y(p.y)}`).join(" ")}
                  fill="none"
                  style={{ stroke: SERIES_COLORS[si] }}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {active !== null && s.points[active] && (
                  <circle cx={xPt(active)} cy={y(s.points[active].y)} r={4.5} strokeWidth={2} style={{ fill: SERIES_COLORS[si], stroke: "var(--surface)" }} />
                )}
              </g>
            ))}

          {endLabels.map((l) => (
            <text key={l.name} x={M.left + innerW + 8} y={l.y} dy="0.32em" style={{ fill: "var(--ink-2)", fontSize: 12, fontWeight: 600 }}>
              {l.name}
            </text>
          ))}
        </svg>

        {readout && active !== null && (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 z-10 min-w-[8rem] border border-line bg-surface px-3 py-2 text-[0.8rem] shadow-[var(--shadow)]"
            // Sit beside the crosshair (right if there's room, else left) so the readout never covers the point.
            style={{ left: xCenter(active) + 164 <= width ? xCenter(active) + 12 : Math.max(xCenter(active) - 164, 0) }}
          >
            <p className="font-semibold text-ink">{categories[active]}</p>
            {readout.map((r) => (
              <p key={r.name} className="mt-1 flex items-center gap-2 text-ink-2">
                <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                {isLine && <span>{r.name}</span>}
                <span className="ml-auto font-semibold tabular-nums text-ink">{r.value === undefined ? "—" : fmt(r.value)}</span>
              </p>
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {readout && active !== null ? `${categories[active]}: ${readout.map((r) => `${isLine ? r.name + " " : ""}${r.value === undefined ? "no data" : fmt(r.value)}`).join(", ")}` : ""}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-[0.8rem] text-ink-3">
        {props.source ? <p>Source: {props.source}</p> : <span />}
        <button
          type="button"
          onClick={() => setShowTable((s) => !s)}
          aria-expanded={showTable}
          aria-controls={tableId}
          className="font-semibold text-blue-text hover:underline"
        >
          {showTable ? "Hide data" : "Show data"}
        </button>
      </div>

      {showTable && (
        <div id={tableId} className="mt-3 overflow-x-auto">
          <table className="w-full text-[0.85rem] tabular-nums">
            <thead>
              <tr className="border-b border-line text-left text-ink-3">
                <th className="py-2 pr-4 font-semibold" scope="col">{isLine ? "" : "Category"}</th>
                {isLine ? series.map((s) => <th key={s.name} className="py-2 pr-4 font-semibold" scope="col">{s.name}</th>) : <th className="py-2 pr-4 font-semibold" scope="col">Value</th>}
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c + i} className="border-b border-line">
                  <th scope="row" className="py-2 pr-4 text-left font-normal text-ink-2">{c}</th>
                  {props.type === "bar" ? (
                    <td className="py-2 pr-4 text-ink">{fmt(props.data[i].value)}</td>
                  ) : (
                    series.map((s) => <td key={s.name} className="py-2 pr-4 text-ink">{s.points[i] ? fmt(s.points[i].y) : "—"}</td>)
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}
