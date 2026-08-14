import { Link } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { courses, sourceDocument } from "../curriculumData";

export default function Courses() {
  const groups = [...new Set(courses.map((course) => course.group))];
  return <div className="page-stack"><PageHeader eyebrow="COURSE CATALOG" title="รายวิชาในหลักสูตร" lead={`รวบรวมรายวิชาที่ระบุในเอกสารหลักสูตร ${courses.length} รายวิชา`} />
    {groups.map((group) => <section className="course-group" key={group}><h2>{group}</h2><div className="course-grid">{courses.filter((course) => course.group === group).map((course) => <Link className="course-card" to={`/courses/${course.code}`} key={course.code}><code>{course.code}</code><h3>{course.title}</h3><p>{course.english}</p><strong>{course.credits}</strong></Link>)}</div></section>)}
    <SourceNote>{sourceDocument}</SourceNote></div>;
}
