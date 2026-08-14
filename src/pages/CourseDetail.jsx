import { Link, useParams } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { courses, sourceDocument } from "../curriculumData";

export default function CourseDetail() {
  const { code } = useParams(); const course = courses.find((item) => item.code.toLowerCase() === code.toLowerCase());
  if (!course) return <PageHeader eyebrow="COURSE" title="ไม่พบรายวิชา" lead={`ไม่พบรหัส ${code} ในรายการรายวิชาที่นำเข้าสู่เว็บไซต์`} />;
  return <div className="page-stack"><PageHeader eyebrow={course.code} title={course.title} lead={course.english} />
    <div className="detail-grid"><div><span>กลุ่มวิชา</span><strong>{course.group}</strong></div><div><span>หน่วยกิต</span><strong>{course.credits}</strong></div></div>
    <Link className="text-link" to="/courses">← กลับไปหน้ารายวิชาทั้งหมด</Link><SourceNote>{sourceDocument}</SourceNote></div>;
}
