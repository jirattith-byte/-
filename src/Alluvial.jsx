import { useMemo, useState } from "react";

export default function Alluvial({ columns, nodes, links, height = 900 }) {
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = pinned || hovered;

  const layout = useMemo(() => {
    const nodeMap = new Map(nodes.map((node) => [node.id, { ...node, incoming: 0, outgoing: 0 }]));
    links.forEach(({ source, target, value = 1 }) => {
      if (nodeMap.has(source)) nodeMap.get(source).outgoing += value;
      if (nodeMap.has(target)) nodeMap.get(target).incoming += value;
    });
    nodeMap.forEach((node) => { node.value = Math.max(node.incoming, node.outgoing, 1); });

    const groups = columns.map((column, index) => ({
      ...column,
      index,
      nodes: nodes.filter((node) => node.column === column.id).map((node) => nodeMap.get(node.id)),
    }));
    const maxTotal = Math.max(...groups.map((group) => group.nodes.reduce((sum, node) => sum + node.value, 0)));
    const maxCount = Math.max(...groups.map((group) => group.nodes.length));
    const gap = 5;
    const scale = (height - 52 - (maxCount - 1) * gap) / maxTotal;
    groups.forEach((group) => {
      const totalHeight = group.nodes.reduce((sum, node) => sum + Math.max(node.value * scale, 8), 0) + Math.max(0, group.nodes.length - 1) * gap;
      let y = Math.max(26, (height - totalHeight) / 2);
      group.nodes.forEach((node) => {
        node.height = Math.max(node.value * scale, 8);
        node.y = y;
        node.sourceOffset = y;
        node.targetOffset = y;
        node.columnIndex = group.index;
        y += node.height + gap;
      });
    });

    const ribbons = links.map((link, index) => {
      const source = nodeMap.get(link.source); const target = nodeMap.get(link.target);
      if (!source || !target) return null;
      const ribbonHeight = Math.max((link.value || 1) * scale, 2.5);
      const ribbon = { ...link, index, sourceNode: source, targetNode: target, sourceY: source.sourceOffset, targetY: target.targetOffset, height: ribbonHeight };
      source.sourceOffset += ribbonHeight; target.targetOffset += ribbonHeight;
      return ribbon;
    }).filter(Boolean);
    return { groups, ribbons, nodeMap };
  }, [columns, nodes, links, height]);

  const related = useMemo(() => {
    if (!active) return null;
    const upstream = new Set([active]); const downstream = new Set([active]);
    let changed = true;
    while (changed) { changed = false; links.forEach((link) => { if (upstream.has(link.target) && !upstream.has(link.source)) { upstream.add(link.source); changed = true; } }); }
    changed = true;
    while (changed) { changed = false; links.forEach((link) => { if (downstream.has(link.source) && !downstream.has(link.target)) { downstream.add(link.target); changed = true; } }); }
    return new Set([...upstream, ...downstream]);
  }, [active, links]);

  const width = 1120; const nodeWidth = 16;
  const x = (index) => 32 + index * ((width - 64 - nodeWidth) / Math.max(columns.length - 1, 1));
  return <div className="alluvial">
    <div className="alluvial-head" style={{ gridTemplateColumns: `repeat(${columns.length},1fr)` }}>{columns.map((column) => <b key={column.id}>{column.label}</b>)}</div>
    <div className="alluvial-scroll"><svg viewBox={`0 0 ${width} ${height}`} className="alluvial-svg" onClick={(event) => { if (event.target.tagName === "svg") setPinned(null); }}>
      <g>{layout.ribbons.map((ribbon) => { const x0=x(ribbon.sourceNode.columnIndex)+nodeWidth; const x1=x(ribbon.targetNode.columnIndex); const mid=(x0+x1)/2; const path=`M${x0},${ribbon.sourceY} C${mid},${ribbon.sourceY} ${mid},${ribbon.targetY} ${x1},${ribbon.targetY} L${x1},${ribbon.targetY+ribbon.height} C${mid},${ribbon.targetY+ribbon.height} ${mid},${ribbon.sourceY+ribbon.height} ${x0},${ribbon.sourceY+ribbon.height} Z`; const visible=!related || (related.has(ribbon.source) && related.has(ribbon.target)); return <path key={ribbon.index} d={path} fill={ribbon.sourceNode.color} className={`alluvial-ribbon${visible ? "" : " dim"}`} />; })}</g>
      <g>{layout.groups.flatMap((group) => group.nodes.map((node) => { const last=node.columnIndex===columns.length-1; const visible=!related || related.has(node.id); return <g key={node.id} className={`alluvial-node${visible ? "" : " dim"}`} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)} onClick={() => setPinned((value) => value===node.id ? null : node.id)}><rect x={x(node.columnIndex)} y={node.y} width={nodeWidth} height={node.height} rx="3" fill={node.color} className={pinned===node.id ? "pinned" : ""}/><text x={last ? x(node.columnIndex)-7 : x(node.columnIndex)+nodeWidth+7} y={node.y+node.height/2} textAnchor={last ? "end" : "start"} dominantBaseline="middle">{node.label}{node.sub && <tspan dx="6">{node.sub}</tspan>}</text></g>; }))}</g>
    </svg></div>
    <p className="alluvial-help">{pinned ? <>ปักหมุดที่ <strong>{layout.nodeMap.get(pinned)?.label}</strong> · คลิกซ้ำหรือพื้นที่ว่างเพื่อยกเลิก</> : <>ชี้เมาส์เพื่อเน้นเส้นทางทั้งสาย · คลิกเพื่อปักหมุด</>}</p>
  </div>;
}
