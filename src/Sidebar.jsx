import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_GROUPS, findNav } from "./navConfig.js";

export default function Sidebar() {
  const { pathname, hash } = useLocation();
  const { item } = findNav(pathname); const sections = item?.sections || [];
  const [here, setHere] = useState(hash.slice(1) || sections[0]?.id || "");
  const [open, setOpen] = useState(false); const [folded, setFolded] = useState(new Set());
  useEffect(() => { setOpen(false); setHere(hash.slice(1) || sections[0]?.id || ""); }, [pathname, hash, sections]);
  useEffect(() => { if (!sections.length) return; const pick = () => { let current = sections[0].id; for (const section of sections) { const element = document.getElementById(section.id); if (element && element.getBoundingClientRect().top <= 120) current = section.id; } setHere(current); }; window.addEventListener("scroll", pick, { passive: true }); return () => window.removeEventListener("scroll", pick); }, [pathname, sections]);
  const toggle = (id) => setFolded((before) => { const next = new Set(before); next.has(id) ? next.delete(id) : next.add(id); return next; });

  return <aside className={`sidebar${open ? " open" : ""}`}><button className="sidebar-toggle" onClick={() => setOpen((value) => !value)}>สารบัญ <i>{open ? "▴" : "▾"}</i></button><div className="sidebar-in">
    {NAV_GROUPS.map((group) => { const links = group.solo ? [{ to: group.to, label: group.label, end: group.end }] : group.items; const isFolded = folded.has(group.id); return <div className={`sidebar-block${isFolded ? " folded" : ""}`} key={group.id}>
      {!group.solo && <button className="sidebar-blockhead" onClick={() => toggle(group.id)}><i>{isFolded ? "▸" : "▾"}</i>{group.label}<span>{links.length}</span></button>}
      {!isFolded && <ul className="sidebar-list">{links.map((link) => { const active = link.end ? pathname === link.to : item?.to === link.to || pathname === link.to; return <li key={link.to}><NavLink to={link.to} end={link.end} className={`sidebar-link${active ? " on" : ""}`}>{link.label}</NavLink>{active && sections.length > 0 && <ul className="sidebar-sub">{sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className={`sidebar-sublink${here === section.id ? " on" : ""}`} onClick={() => setHere(section.id)}>{section.label}</a></li>)}</ul>}</li>; })}</ul>}
    </div>; })}
  </div></aside>;
}
