import { PageHeader, SourceNote } from "./ui";
import { careers, sourceDocument } from "../curriculumData";

export default function Careers() { return <div className="page-stack"><PageHeader eyebrow="CAREER PATHS" title="อาชีพหลังสำเร็จการศึกษา" lead="แนวทางประกอบอาชีพที่ระบุในเอกสารหลักสูตร" /><div className="career-grid">{careers.map((career, index) => <article key={career}><span>{String(index + 1).padStart(2, "0")}</span><h2>{career}</h2></article>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
