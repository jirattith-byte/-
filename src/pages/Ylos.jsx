import { Link } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { sourceDocument, ylos } from "../curriculumData";

export default function Ylos() { return <div className="page-stack"><PageHeader eyebrow="YEAR LEARNING OUTCOMES" title="ผลลัพธ์การเรียนรู้รายชั้นปี" lead="ลำดับพัฒนาการเรียนรู้ตั้งแต่พื้นฐานวิทยาศาสตร์สู่การประเมินและแก้ปัญหาการผลิตปศุสัตว์" /><div className="timeline">{ylos.map((ylo) => <Link className="timeline-item" to={`/ylo/${ylo.id}`} key={ylo.id}><span>{ylo.year}</span><p>{ylo.text}</p></Link>)}</div><SourceNote>{sourceDocument}</SourceNote></div>; }
