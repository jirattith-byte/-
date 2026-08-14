import { PageHeader, Section, SourceNote } from "./ui";
import { plos, sourceDocument } from "../curriculumData";

export default function KsaPedagogy() { return <div className="page-stack"><PageHeader eyebrow="KSA & PEDAGOGY" title="ความรู้ ทักษะ คุณลักษณะ และการจัดการเรียนรู้" lead="จัดกลุ่มสาระจากผลลัพธ์การเรียนรู้เพื่อช่วยสำรวจแนวทางการสอน" /><div className="three-columns"><Section title="ความรู้"><p>{plos[0].text}</p></Section><Section title="ทักษะ"><p>{plos[1].text}</p><p>{plos[2].text}</p></Section><Section title="คุณลักษณะ"><p>{plos[3].text}</p><p>{plos[4].text}</p></Section></div><SourceNote>{sourceDocument}</SourceNote></div>; }
