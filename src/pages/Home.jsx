import { Link } from "react-router-dom";
import { careers, courses, plos, program, structure, ylos } from "../curriculumData";

const cards = [
  ["/structure", "▦", "โครงสร้างหลักสูตร", "122 หน่วยกิต แยกตามหมวดและกลุ่มวิชา พร้อมรายวิชาในแต่ละกลุ่ม"],
  ["/plo", "◎", "PLO 5 ข้อ", "ผลลัพธ์การเรียนรู้ระดับหลักสูตรจากเอกสาร มคอ.2"],
  ["/ylo", "◈", "YLO 4 ชั้นปี", "พัฒนาการเรียนรู้จากพื้นฐานวิทยาศาสตร์สู่การแก้ปัญหาการผลิตปศุสัตว์"],
  ["/clo", "✓", "CLO รายวิชา", "จุดเชื่อมโยงผลลัพธ์การเรียนรู้กับรายวิชาสัตวศาสตร์"],
  ["/plan", "▤", "แผนการเรียน", "แผน 4 ปี พร้อมทางเลือกฝึกงาน สหกิจศึกษา และการเรียนรู้ร่วมกับการทำงาน"],
  ["/graph", "⇄", "กราฟหลักสูตร", "ภาพสัดส่วนหน่วยกิตของหมวดวิชาและกลุ่มวิชา"],
  ["/careers", "◆", "เส้นทางอาชีพ", "แนวทางประกอบอาชีพที่ระบุในเอกสารหลักสูตร"],
  ["/courses", "☰", "รายวิชา", `${courses.length} รายวิชาที่นำเข้าสู่เว็บไซต์`],
];

export default function Home() {
  return <main><div className="hero"><div className="wrap">
    <div className="eyebrow">Bachelor of Science · Animal Science</div>
    <h1>หลักสูตรวิทยาศาสตรบัณฑิต<br />สาขาวิชาสัตวศาสตร์</h1>
    <p className="lead">{program.philosophy} มุ่งพัฒนาความรู้และทักษะด้านการผลิตปศุสัตว์ การจัดการผลผลิต การสื่อสาร การทำงานร่วมกัน และจรรยาบรรณวิชาชีพ</p>
    <div className="hero-stats"><div><b>{program.totalCredits}</b><span>หน่วยกิตรวม</span></div><div><b>{plos.length}</b><span>PLO ระดับหลักสูตร</span></div><div><b>{ylos.length}</b><span>YLO รายชั้นปี</span></div><div><b>{courses.length}</b><span>รายวิชาในเว็บไซต์</span></div><div><b>3</b><span>ทางเลือกประสบการณ์</span></div><div><b>{careers.length}</b><span>แนวทางอาชีพ</span></div></div>
    <div className="note"><b>อัตลักษณ์หลักสูตร:</b> {program.identity}</div>
    <div className="hero-cta"><Link className="btn primary" to="/structure">ดูโครงสร้างหลักสูตร</Link><Link className="btn" to="/obe">ขั้นตอนการวิเคราะห์ OBE</Link><Link className="btn" to="/plo">ผลลัพธ์การเรียนรู้ PLO</Link></div>
  </div></div>
  <div className="wrap">
    <section className="sect"><h2 className="sect-h">สำรวจหลักสูตร</h2><div className="cardgrid">{cards.map(([to, icon, title, desc]) => <Link className="navcard" to={to} key={to}><span className="ic">{icon}</span><b>{title}</b><p>{desc}</p><span className="go">เปิดดู →</span></Link>)}</div></section>
    <section className="sect"><h2 className="sect-h">เส้นทางการเรียนรู้ 4 ชั้นปี<small>Curriculum Scaffolding</small></h2><div className="ladder">{ylos.map((ylo, index) => <Link to={`/ylo/${ylo.id}`} className="rung" key={ylo.id} style={{ "--yc": `var(--y${index + 1})` }}><div className="rung-h"><b>{ylo.year}</b><span>{ylo.id}</span></div><div className="rung-t">{ylo.text}</div><div className="rung-l">เปิดดูรายละเอียด →</div></Link>)}</div></section>
    <section className="sect"><h2 className="sect-h">สัดส่วนหน่วยกิตตามหมวดวิชา</h2><div className="creditbar big">{structure.map((item, index) => <div className={`cbseg s${Math.min(index,2)}`} style={{ flexGrow: item.credits }} key={item.id}><b>{item.credits}</b><span>{item.label}</span></div>)}</div><p className="hint">รวม {program.totalCredits} หน่วยกิต · <Link to="/structure">ดูรายละเอียดแต่ละกลุ่มวิชา →</Link></p></section>
    <section className="sect"><h2 className="sect-h">ผลลัพธ์การเรียนรู้ระดับหลักสูตร (PLO)</h2><div className="plostrip">{plos.map((plo, index) => <Link to={`/plo/${plo.id}`} className="plocard-sm" key={plo.id} style={{ "--pc": `var(--plo${index + 1})` }}><span className="num">{plo.id}</span><b>{plo.title}</b><small>{plo.text}</small></Link>)}</div></section>
  </div></main>;
}
