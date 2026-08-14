import { PageHeader, SourceNote } from "./ui";
import { sourceDocument, teachingMethods } from "../curriculumData";

export default function Teaching() { return <div className="page-stack"><PageHeader eyebrow="TEACHING & LEARNING" title="กลยุทธ์การจัดการเรียนรู้" lead="แนวทางการสอนที่ระบุร่วมกับผลลัพธ์การเรียนรู้รายชั้นปี" /><div className="method-grid">{teachingMethods.map((method, index) => <article key={method}><code>{String(index + 1).padStart(2, "0")}</code><h2>{method}</h2></article>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
