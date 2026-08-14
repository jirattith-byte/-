import { PageHeader, SourceNote } from "./ui";
import { assessmentMethods, sourceDocument } from "../curriculumData";

export default function Assessment() { return <div className="page-stack"><PageHeader eyebrow="ASSESSMENT" title="กลยุทธ์การวัดและประเมินผล" lead="วิธีประเมินที่ใช้ร่วมกับผลลัพธ์การเรียนรู้ของหลักสูตร" /><div className="method-grid">{assessmentMethods.map((method, index) => <article key={method}><code>{String(index + 1).padStart(2, "0")}</code><h2>{method}</h2></article>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
