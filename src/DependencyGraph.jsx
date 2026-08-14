import { useMemo, useState } from "react";
import dagre from "dagre";
import { courses } from "./curriculumData.js";

const NODE_W = 210;
const NODE_H = 74;
const GROUP_ORDER = ["วิชาชีพพื้นฐาน", "วิชาชีพบังคับ", "วิชาชีพเลือก", "ฝึกประสบการณ์วิชาชีพ"];
const GROUP_STYLE = {
  "วิชาชีพพื้นฐาน": { fg: "#2f6fb0", bg: "#e8f1fb", short: "พื้นฐาน" },
  "วิชาชีพบังคับ": { fg: "#2f9e6b", bg: "#e6f5ee", short: "บังคับ" },
  "วิชาชีพเลือก": { fg: "#dd8a1e", bg: "#fdf1df", short: "เลือก" },
  "ฝึกประสบการณ์วิชาชีพ": { fg: "#8e44ad", bg: "#f3ebfb", short: "ประสบการณ์" },
};
const EDGE_STYLE = {
  hard: { stroke: "#16335c", width: 2.3, dash: "0", label: "วิชาบังคับก่อน" },
  co: { stroke: "#c9971b", width: 2.2, dash: "3 4", label: "เรียนก่อนหรือเรียนควบคู่" },
};
const EDGES = [
  ["SC-081-103", "SC-081-104", "co"],
  ["SC-091-001", "SC-091-002", "co"],
  ["SC-091-001", "SC-091-304", "hard"],
  ["SC-091-304", "SC-091-305", "co"],
  ["SC-081-103", "SC-081-216", "hard"],
  ["SC-101-201", "AG-021-303", "hard"],
  ["AG-025-317", "AG-025-318", "hard"],
  ["AG-025-318", "AG-025-419", "hard"],
].map(([source, target, kind]) => ({ id: `${source}-${target}`, source, target, kind }));

function courseYear(code) {
  if (code.startsWith("GE-")) return 0;
  const last = code.split("-").at(-1);
  return Number(last?.[0]) || 0;
}

function curve(points) {
  if (!points?.length) return "";
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index]; const next = points[index + 1];
    path += ` Q ${point.x} ${point.y} ${(point.x + next.x) / 2} ${(point.y + next.y) / 2}`;
  }
  const last = points.at(-1); return `${path} L ${last.x} ${last.y}`;
}

function dagreLayout(nodes, edges) {
  const graph = new dagre.graphlib.Graph({ multigraph: true });
  graph.setGraph({ rankdir: "LR", ranksep: 135, nodesep: 30, edgesep: 20, marginx: 45, marginy: 45 });
  graph.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((node) => graph.setNode(node.id, { width: node.width, height: node.height }));
  edges.forEach((edge) => graph.setEdge(edge.source, edge.target, {}, edge.id));
  dagre.layout(graph);
  return {
    nodes: nodes.map((node) => { const pos = graph.node(node.id); return { ...node, x: pos.x - node.width / 2, y: pos.y - node.height / 2 }; }),
    edges: edges.map((edge) => ({ ...edge, points: graph.edge({ v: edge.source, w: edge.target, name: edge.id })?.points || [] })),
    width: graph.graph().width + 40,
    height: graph.graph().height + 40,
  };
}

export default function DependencyGraph() {
  const [scope, setScope] = useState("core");
  const [mode, setMode] = useState("dependency");
  const [groupFilter, setGroupFilter] = useState(null);
  const [selected, setSelected] = useState(null);
  const [focus, setFocus] = useState(false);
  const [zoom, setZoom] = useState(0.8);
  const [expanded, setExpanded] = useState(false);

  const graphCourses = useMemo(() => courses.filter((course) => {
    if (!GROUP_ORDER.includes(course.group)) return false;
    return scope === "all" || course.group !== "วิชาชีพเลือก";
  }).map((course) => ({ ...course, year: courseYear(course.code) })), [scope]);
  const byCode = useMemo(() => Object.fromEntries(graphCourses.map((course) => [course.code, course])), [graphCourses]);
  const graphEdges = useMemo(() => EDGES.filter((edge) => byCode[edge.source] && byCode[edge.target]), [byCode]);
  const chain = useMemo(() => {
    if (!selected) return new Set();
    const result = new Set([selected]); const queue = [selected];
    while (queue.length) { const current = queue.shift(); graphEdges.forEach((edge) => { const next = edge.source === current ? edge.target : edge.target === current ? edge.source : null; if (next && !result.has(next)) { result.add(next); queue.push(next); } }); }
    return result;
  }, [selected, graphEdges]);

  const layout = useMemo(() => {
    const visible = focus && selected ? graphCourses.filter((course) => chain.has(course.code)) : graphCourses;
    if (mode === "dependency") {
      const codes = new Set(visible.map((course) => course.code));
      return dagreLayout(visible.map((course) => ({ id: course.code, course, width: NODE_W, height: NODE_H })), graphEdges.filter((edge) => codes.has(edge.source) && codes.has(edge.target)));
    }
    const buckets = mode === "group" ? GROUP_ORDER.map((group) => ({ id: group, label: group, list: visible.filter((course) => course.group === group) })) : [1, 2, 3, 4].map((year) => ({ id: `year-${year}`, label: `ชั้นปีที่ ${year}`, list: visible.filter((course) => course.year === year) }));
    const nodes = []; let maxRows = 0;
    buckets.forEach((bucket, column) => { maxRows = Math.max(maxRows, bucket.list.length); nodes.push({ id: `header-${bucket.id}`, header: bucket.label, count: bucket.list.length, x: 40 + column * (NODE_W + 45), y: 25, width: NODE_W, height: 42 }); bucket.list.sort((a,b) => a.code.localeCompare(b.code)).forEach((course, row) => nodes.push({ id: course.code, course, x: 40 + column * (NODE_W + 45), y: 90 + row * (NODE_H + 14), width: NODE_W, height: NODE_H })); });
    return { nodes, edges: [], width: 80 + buckets.length * (NODE_W + 45), height: 140 + maxRows * (NODE_H + 14) };
  }, [mode, graphCourses, graphEdges, focus, selected, chain]);

  return <div className="graphwrap">
    <div className="note"><b>หลักฐานความสัมพันธ์:</b> แสดงเฉพาะวิชาบังคับก่อนและวิชาที่เรียนก่อนหรือเรียนควบคู่กันซึ่งระบุใน มคอ.2 จำนวน {EDGES.length} ความสัมพันธ์</div>
    <div className="graphbar">
      <button className={`gmode${scope === "core" ? " on" : ""}`} onClick={() => { setScope("core"); setSelected(null); }}>วิชาพื้นฐานและบังคับ</button>
      <button className={`gmode${scope === "all" ? " on" : ""}`} onClick={() => { setScope("all"); setSelected(null); }}>รวมวิชาชีพเลือก</button><span className="gsep" />
      {[["dependency","① Dependencies"],["group","② แยกตามหมวด"],["year","③ แยกตามชั้นปี"]].map(([id,label]) => <button key={id} className={`gmode${mode === id ? " on" : ""}`} onClick={() => { setMode(id); setSelected(null); setFocus(false); }}>{label}</button>)}<span className="gsep" />
      <span className="glabel">สีตามหมวด:</span>{GROUP_ORDER.map((group) => <button key={group} className={`gchip${groupFilter === group ? " on" : ""}`} style={{ borderColor: GROUP_STYLE[group].fg, color: groupFilter === group ? "#fff" : GROUP_STYLE[group].fg, background: groupFilter === group ? GROUP_STYLE[group].fg : GROUP_STYLE[group].bg }} onClick={() => setGroupFilter((value) => value === group ? null : group)}>{GROUP_STYLE[group].short}</button>)}
      <span className="gsep" /><span className="glabel">ซูม</span><button className="gtool" onClick={() => setZoom((value) => Math.max(.35,value-.1))}>−</button><input type="range" min=".35" max="1.5" step=".05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><button className="gtool" onClick={() => setZoom((value) => Math.min(1.5,value+.1))}>+</button><button className="gtool wide" onClick={() => setZoom(.8)}>{Math.round(zoom*100)}% · รีเซ็ต</button><button className={`gtool wide${expanded ? " on" : ""}`} onClick={() => setExpanded((value) => !value)}>{expanded ? "ย่อพื้นที่กราฟ" : "ขยายพื้นที่กราฟ"}</button>
    </div>
    {selected && <div className="graph-selection"><div><b>{selected} · {byCode[selected]?.title}</b><span>พบวิชาในสายความสัมพันธ์นี้ {chain.size} วิชา</span></div><div className="graph-selection-actions"><button className={`gtool wide${focus ? " on" : ""}`} onClick={() => setFocus((value) => !value)}>{focus ? "แสดงทุกวิชา" : "แสดงเฉพาะสายนี้"}</button><button className="gclear" onClick={() => { setSelected(null); setFocus(false); }}>✕ ยกเลิก</button></div></div>}
    <div className={`graphcanvas${expanded ? " expanded" : ""}`}><div className="graphscroll"><svg className="gsvg" width={layout.width*zoom} height={layout.height*zoom} viewBox={`0 0 ${layout.width} ${layout.height}`}>
      <defs>{Object.entries(EDGE_STYLE).map(([kind,style]) => <marker key={kind} id={`arrow-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={style.stroke} /></marker>)}</defs>
      <g>{layout.edges.map((edge) => { const style=EDGE_STYLE[edge.kind]; const dim=selected && (!chain.has(edge.source)||!chain.has(edge.target)); return <path key={edge.id} d={curve(edge.points)} fill="none" stroke={style.stroke} strokeWidth={style.width} strokeDasharray={style.dash} markerEnd={`url(#arrow-${edge.kind})`} opacity={dim ? .08 : .9} />; })}</g>
      <g>{layout.nodes.map((node) => { if (node.header) return <foreignObject key={node.id} x={node.x} y={node.y} width={node.width} height={node.height}><div className="ghdr">{node.header} ({node.count})</div></foreignObject>; const course=node.course; const style=GROUP_STYLE[course.group]; const dim=(groupFilter&&course.group!==groupFilter)||(selected&&!chain.has(course.code)); return <foreignObject key={node.id} x={node.x} y={node.y} width={node.width} height={node.height} style={{ opacity:dim?.16:1,cursor:"pointer" }} onClick={() => mode === "dependency" && setSelected((value) => value === course.code ? null : course.code)}><div className="gnode" style={{ background:style.bg,borderColor:selected===course.code?"#c9971b":style.fg }}><div className="gnode-top"><span className="gnode-code">{course.code}</span><span className="gnode-yr" style={{background:style.fg}}>{course.year ? `ปี ${course.year}` : "ทั่วไป"}</span></div><div className="gnode-name">{course.title}</div><div className="gnode-foot">{course.credits} · {style.short}</div></div></foreignObject>; })}</g>
    </svg></div><div className="graph-legend floating"><div className="row"><b>{mode === "dependency" ? "เส้นลูกศร" : "สีของกล่อง"}</b></div>{mode === "dependency" ? Object.entries(EDGE_STYLE).map(([kind,style]) => <div className="row" key={kind}><svg width="36" height="10"><line x1="1" y1="5" x2="27" y2="5" stroke={style.stroke} strokeWidth={style.width} strokeDasharray={style.dash}/><polygon points="27,1 35,5 27,9" fill={style.stroke}/></svg>{style.label}</div>) : GROUP_ORDER.map((group) => <div className="row" key={group}><span className="sw" style={{background:GROUP_STYLE[group].fg}}/>{group}</div>)}<div className="hint">คลิกกล่องรายวิชาเพื่อเน้นสายวิชาก่อน–หลัง แล้วเลือก “แสดงเฉพาะสายนี้” เพื่อย่อกราฟ</div></div></div>
  </div>;
}
