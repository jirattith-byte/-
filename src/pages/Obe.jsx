import { NEED_LEVEL, NEEDS, PRIO_INFO, STAKEHOLDERS } from "../obeData";
import { PageHeader } from "./ui";

function CodeBadge({ code }) {
  return <code className="code-badge" data-code={code}>{code}</code>;
}

export default function Obe() {
  const linkedSh = new Set(NEEDS.flatMap((need) => need.sh));
  const orphanStakeholders = STAKEHOLDERS.filter((item) => !linkedSh.has(item.id));
  const unsupportedNeeds = NEEDS.filter((item) => item.sh.length === 0 && (!item.source || item.source === "รอหลักฐาน"));
  const clean = orphanStakeholders.length === 0 && unsupportedNeeds.length === 0;

  return <div className="page-stack obe-page">
    <PageHeader eyebrow="OBE · STEP 02" title="ผู้มีส่วนได้ส่วนเสียและความต้องการ" lead="บันทึกว่าใครให้ข้อมูล จำนวนเท่าใด เก็บเมื่อใด และระบุความต้องการอะไร ก่อนเริ่มออกแบบผลลัพธ์การเรียนรู้" />

    <div className={`audit-bar ${clean ? "pass" : "warn"}`}>
      {clean ? <><strong>ตรวจข้อมูลผ่าน</strong><span>ทุก SH และ N มีความเชื่อมโยงหรือหลักฐานรองรับ</span></> : <>
        <strong>ข้อมูลยังไม่พร้อมสำหรับออกแบบ PLO</strong>
        <span>SH ที่ยังไม่มีความต้องการผูกอยู่: {orphanStakeholders.map((item) => item.id).join(", ") || "ไม่มี"}</span>
        <span>ความต้องการที่ยังไม่มี SH หรือหลักฐานรองรับ: {unsupportedNeeds.map((item) => item.id).join(", ") || "ไม่มี"}</span>
      </>}
    </div>

    <section className="obe-step" id="sh">
      <div className="step-heading"><span>①</span><div><p>STAKEHOLDERS</p><h2>ผู้มีส่วนได้ส่วนเสีย</h2></div></div>
      <p className="section-intro">ทุกกลุ่มต้องระบุวิธีเก็บข้อมูล ขนาดกลุ่มตัวอย่าง และช่วงเวลาที่เก็บอย่างตรวจสอบได้</p>
      <div className="table-wrap"><table className="stakeholder-table">
        <thead><tr><th>รหัส / กลุ่ม</th><th>วิธีเก็บข้อมูล</th><th>ขนาดกลุ่มตัวอย่าง</th><th>ช่วงเวลาที่เก็บ</th><th>ความสำคัญ</th></tr></thead>
        <tbody>{STAKEHOLDERS.map((item) => { const prio = PRIO_INFO[item.prio]; return <tr key={item.id}>
          <td><CodeBadge code={item.id} /><strong>{item.name}</strong></td>
          <td>{item.method}</td>
          <td><strong className={typeof item.n === "number" ? "sample-number" : "sample-pending"}>{item.n}</strong></td>
          <td>{item.period}</td>
          <td><span className="level-pill" style={{ "--level-color": prio.color }}>{prio.label}</span></td>
        </tr>; })}</tbody>
      </table></div>
    </section>

    <section className="obe-step" id="needs">
      <div className="step-heading"><span>②</span><div><p>NEEDS</p><h2>ความต้องการ</h2></div></div>
      <p className="section-intro">ข้อความต้องเขียนเป็นสิ่งที่บัณฑิตทำได้หรือปัญหาที่ต้องแก้ และต้องมี SH หรือหลักฐานเชิงเอกสารรองรับ</p>
      <div className="needs-grid">{NEEDS.map((need) => { const level = NEED_LEVEL[need.level]; return <article className="need-card" key={need.id} style={{ "--need-color": level.color }}>
        <header><CodeBadge code={need.id} /><span>{level.label}</span></header>
        <h3>{need.text}</h3>
        <div className="need-sh">{need.sh.length ? need.sh.map((code) => <CodeBadge code={code} key={code} />) : <em>ยังไม่มี SH รองรับ</em>}</div>
        <footer>ที่มา: {need.source}</footer>
      </article>; })}</div>
    </section>
  </div>;
}
