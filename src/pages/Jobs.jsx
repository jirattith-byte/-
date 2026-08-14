import { PageHeader, Section, SourceNote } from "./ui";
import { careers, sourceDocument } from "../curriculumData";

export default function Jobs() { return <div className="page-stack"><PageHeader eyebrow="EMPLOYMENT AREAS" title="กลุ่มงานและหน่วยงาน" lead="รวบรวมประเภทงานจากรายการอาชีพในเอกสารหลักสูตร" /><Section title="ภาคธุรกิจและฟาร์ม"><ul>{careers.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul></Section><Section title="วิชาการ ภาครัฐ และองค์กร"><ul>{careers.slice(5).map((item) => <li key={item}>{item}</li>)}</ul></Section><SourceNote>{sourceDocument}</SourceNote></div>; }
