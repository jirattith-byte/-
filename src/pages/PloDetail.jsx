import { Link, useParams } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { plos, sourceDocument } from "../curriculumData";

export default function PloDetail() { const { id } = useParams(); const plo = plos.find((item) => item.id.toLowerCase() === id.toLowerCase()); if (!plo) return <PageHeader eyebrow="PLO" title="ไม่พบผลลัพธ์การเรียนรู้" />; return <div className="page-stack"><PageHeader eyebrow={plo.id} title={plo.title} lead={plo.text} /><Link className="text-link" to="/plo">← กลับไปหน้าผลลัพธ์ระดับหลักสูตร</Link><SourceNote>{sourceDocument}</SourceNote></div>; }
