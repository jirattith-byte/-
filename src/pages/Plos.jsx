import { Link } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { plos, sourceDocument } from "../curriculumData";

export default function Plos() { return <div className="page-stack"><PageHeader eyebrow="PROGRAM LEARNING OUTCOMES" title="ผลลัพธ์การเรียนรู้ระดับหลักสูตร" lead="ความสามารถและคุณลักษณะที่คาดหวังจากผู้สำเร็จการศึกษา" /><div className="outcome-list">{plos.map((plo) => <Link to={`/plo/${plo.id}`} className="outcome-card" key={plo.id}><code>{plo.id}</code><div><h2>{plo.title}</h2><p>{plo.text}</p></div></Link>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
