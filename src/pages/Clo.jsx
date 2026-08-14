import { Link } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { courses, sourceDocument } from "../curriculumData";

export default function Clo() { return <div className="page-stack"><PageHeader eyebrow="COURSE LEARNING OUTCOMES" title="ผลลัพธ์การเรียนรู้ระดับรายวิชา" lead="เข้าสู่รายละเอียดรายวิชาเพื่อใช้เป็นจุดเชื่อมโยง CLO กับรายวิชา" /><div className="compact-list">{courses.filter((course) => course.code.startsWith("AG-02")).map((course) => <Link to={`/courses/${course.code}`} key={course.code}><code>{course.code}</code><span>{course.title}</span><strong>{course.credits}</strong></Link>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
