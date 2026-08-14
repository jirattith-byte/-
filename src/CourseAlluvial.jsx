import { useMemo, useState } from "react";
import Alluvial from "./Alluvial.jsx";
import { courses } from "./curriculumData.js";

const GROUP_COLORS = ["#64748b", "#2f6fb0", "#2f9e6b", "#dd8a1e", "#8e44ad"];
const CORE_GROUPS = new Set(["วิชาชีพพื้นฐาน", "วิชาชีพบังคับ", "ฝึกประสบการณ์วิชาชีพ"]);
const courseYear = (code) => code.startsWith("GE-") ? 0 : Number(code.split("-").at(-1)?.[0]) || 0;

export default function CourseAlluvial() {
  const [scope, setScope] = useState("all");
  const diagram = useMemo(() => {
    const selected = courses.filter((course) => scope === "all" || (scope === "core" ? CORE_GROUPS.has(course.group) : course.group === "วิชาชีพเลือก"));
    const groups = [...new Set(selected.map((course) => course.group))];
    const years = [...new Set(selected.map((course) => courseYear(course.code)))].sort();
    const colors = Object.fromEntries(groups.map((group, index) => [group, GROUP_COLORS[index % GROUP_COLORS.length]]));
    const nodes = [
      ...groups.map((group) => ({ id:`group:${group}`, column:"group", label:group, sub:`${selected.filter((course) => course.group===group).length} รายวิชา`, color:colors[group] })),
      ...years.map((year) => ({ id:`year:${year}`, column:"year", label:year ? `ชั้นปีที่ ${year}` : "ศึกษาทั่วไป", color:"#c9971b" })),
      ...selected.map((course) => ({ id:`course:${course.code}`, column:"course", label:course.code, sub:course.title, color:colors[course.group] })),
    ];
    const aggregate = new Map();
    selected.forEach((course) => { const key=`${course.group}|${courseYear(course.code)}`; aggregate.set(key,(aggregate.get(key)||0)+1); });
    const links = [...aggregate].map(([key,value]) => { const [group,year]=key.split("|"); return { source:`group:${group}`, target:`year:${year}`, value }; });
    selected.forEach((course) => links.push({ source:`year:${courseYear(course.code)}`, target:`course:${course.code}`, value:1 }));
    return { nodes, links, height:Math.max(820, selected.length*27) };
  }, [scope]);

  return <section id="alluvial" className="alluvial-section">
    <header><div><p className="eyebrow">ALLUVIAL DIAGRAM</p><h2>แผนภาพสายธารหลักสูตรสัตวศาสตร์</h2><p>ติดตามการไหลจากกลุ่มรายวิชา ผ่านชั้นปีตามเลขหลักแรกของรหัสรายวิชา ไปยังรายวิชาแต่ละรายการ</p></div><div className="alluvial-tabs">{[["all","ทุกรายวิชา"],["core","พื้นฐานและบังคับ"],["elective","วิชาเลือก"]].map(([id,label]) => <button key={id} className={scope===id ? "on" : ""} onClick={() => setScope(id)}>{label}</button>)}</div></header>
    <div className="note"><b>ที่มาของความเชื่อมโยง:</b> หมวดวิชาและรหัสรายวิชาจาก มคอ.2 โดยชั้นปีอ่านจากเลขหลักแรกของเลขประจำรายวิชาตามระบบรหัสในเอกสารหลักสูตร</div>
    <Alluvial columns={[{id:"group",label:"① กลุ่มรายวิชา"},{id:"year",label:"② ชั้นปี"},{id:"course",label:"③ รายวิชา"}]} {...diagram}/>
  </section>;
}
