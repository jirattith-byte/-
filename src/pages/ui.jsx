export function PagePlaceholder({ title, step }) {
  return (
    <article className="page-card">
      <p className="eyebrow">STEP {step}</p>
      <h1>{title}</h1>
      <p className="placeholder-message">ยังไม่มีข้อมูล — ดูขั้นที่ {step} ของคู่มือ</p>
    </article>
  );
}

export function DetailPlaceholder({ title, step, idLabel, id }) {
  return (
    <article className="page-card">
      <p className="eyebrow">STEP {step}</p>
      <h1>{title}</h1>
      <p className="route-value"><span>{idLabel}</span> {id}</p>
      <p className="placeholder-message">ยังไม่มีข้อมูล — ดูขั้นที่ {step} ของคู่มือ</p>
    </article>
  );
}

export function PageHeader({ eyebrow, title, lead }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{lead && <p className="lead">{lead}</p>}</header>;
}

export function Section({ title, children, className = "" }) {
  return <section className={`content-section ${className}`}><h2>{title}</h2>{children}</section>;
}

export function SourceNote({ children }) {
  return <p className="source-note">แหล่งข้อมูล: {children}</p>;
}
