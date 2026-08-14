export default function CodeTip({ tip }) {
  if (!tip) return null;
  return <div className="code-tip" role="tooltip" style={{ left: tip.x, top: tip.y }}>
    <code>{tip.info.code}</code>
    <strong>{tip.info.title}</strong>
    <p>{tip.info.text}</p>
  </div>;
}
