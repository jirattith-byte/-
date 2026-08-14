import { Link, useParams } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { courses, sourceDocument, structure } from "../curriculumData";

const groupMap = { general: ["ศึกษาทั่วไปบังคับ"], foundation: ["วิชาชีพพื้นฐาน"], required: ["วิชาชีพบังคับ"], elective: ["วิชาชีพเลือก"], free: [] };
export default function StructureDetail() {
  const { id } = useParams(); const item = structure.find((entry) => entry.id === id);
  if (!item) return <PageHeader eyebrow="STRUCTURE" title="ไม่พบหมวดวิชา" lead="ไม่พบรหัสโครงสร้างนี้ในเอกสารหลักสูตร" />;
  const related = courses.filter((course) => groupMap[id]?.includes(course.group));
  return <div className="page-stack"><PageHeader eyebrow={`${item.credits} CREDITS`} title={item.label} lead={item.detail} />
    {related.length > 0 ? <div className="course-grid">{related.map((course) => <Link className="course-card" to={`/courses/${course.code}`} key={course.code}><code>{course.code}</code><h2>{course.title}</h2><p>{course.english}</p><strong>{course.credits}</strong></Link>)}</div> : <div className="info-panel">หมวดวิชาเลือกเสรีให้เลือกจากรายวิชาที่เป็นไปตามเงื่อนไขของหลักสูตร</div>}
    <SourceNote>{sourceDocument}</SourceNote></div>;
}
