import DependencyGraph from "../DependencyGraph.jsx";
import { PageHeader, SourceNote } from "./ui";
import { sourceDocument } from "../curriculumData.js";

export default function Graph() {
  return <main><div className="page-stack graph-page"><PageHeader eyebrow="COURSE DEPENDENCY GRAPH" title="กราฟรายวิชา" lead="สำรวจรายวิชาตามลำดับก่อน–หลัง หมวดวิชา และชั้นปี พร้อมตัวกรองและการซูมแบบโต้ตอบ" /><DependencyGraph /><SourceNote>{sourceDocument}</SourceNote></div></main>;
}
