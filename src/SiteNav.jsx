import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_GROUPS, findNav } from "./navConfig.js";

export default function SiteNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const pinnedRef = useRef(false);
  const navRef = useRef(null);
  const active = findNav(pathname);
  const pin = (value) => { pinnedRef.current = value; };

  useEffect(() => { setOpen(null); setDrawer(false); pin(false); }, [pathname]);
  useEffect(() => {
    const onDown = (event) => { if (navRef.current && !navRef.current.contains(event.target)) { setOpen(null); setDrawer(false); pin(false); } };
    const onKey = (event) => { if (event.key === "Escape") { setOpen(null); setDrawer(false); pin(false); } };
    document.addEventListener("mousedown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);

  return <nav className="site-nav" ref={navRef} aria-label="เมนูหลัก"><div className="wrap nav-in">
    <button className="nav-burger" aria-expanded={drawer} onClick={() => setDrawer((value) => !value)}>☰</button>
    <div className={`nav-groups${drawer ? " open" : ""}`}>{NAV_GROUPS.map((group) => {
      if (group.solo) return <NavLink key={group.id} to={group.to} end={group.end} className={({ isActive }) => `nav-top${isActive ? " active" : ""}`}>{group.label}</NavLink>;
      const isOpen = open === group.id; const isActive = active.group?.id === group.id;
      return <div className={`nav-group${isOpen ? " open" : ""}`} key={group.id} onMouseEnter={() => { if (!pinnedRef.current) setOpen(group.id); }} onMouseLeave={() => { if (!pinnedRef.current) setOpen(null); }}>
        <button className={`nav-top${isActive ? " active" : ""}`} aria-expanded={isOpen} onClick={() => { const same = isOpen && pinnedRef.current; setOpen(same ? null : group.id); pin(!same); }}>{group.label}<i>▾</i></button>
        <div className="nav-menu"><div className="nav-menu-hint">{group.hint}</div>{group.items.map((item) => <Link key={item.to} to={item.to} className={`nav-menu-item${active.item?.to === item.to ? " on" : ""}`}><b>{item.label}</b><span>{item.desc}</span></Link>)}</div>
      </div>;
    })}</div>
  </div></nav>;
}
