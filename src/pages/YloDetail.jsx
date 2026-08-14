import { Link, useParams } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { sourceDocument, ylos } from "../curriculumData";

export default function YloDetail() { const { id } = useParams(); const ylo = ylos.find((item) => item.id.toLowerCase() === id.toLowerCase()); if (!ylo) return <PageHeader eyebrow="YLO" title="ไม่พบผลลัพธ์รายชั้นปี" />; return <div className="page-stack"><PageHeader eyebrow={ylo.id} title={ylo.year} lead={ylo.text} /><Link className="text-link" to="/ylo">← กลับไปหน้าผลลัพธ์รายชั้นปี</Link><SourceNote>{sourceDocument}</SourceNote></div>; }
