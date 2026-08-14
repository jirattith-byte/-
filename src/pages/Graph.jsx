import DependencyGraph from "../DependencyGraph.jsx";
import CourseAlluvial from "../CourseAlluvial.jsx";
import { PageHeader, SourceNote } from "./ui";
import { sourceDocument } from "../curriculumData.js";

export default function Graph() {
  return <main><div className="page-stack graph-page"><PageHeader eyebrow="COURSE MAPS" title="กราฟและแผนภาพสายธารรายวิชา" lead="สำรวจลำดับก่อน–หลัง และติดตามสายธารจากกลุ่มรายวิชา ผ่านชั้นปี ไปยังรายวิชาแต่ละรายการ" /><DependencyGraph /><CourseAlluvial /><SourceNote>{sourceDocument}</SourceNote></div></main>;
}
