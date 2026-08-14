import { Link } from "react-router-dom";
import { PageHeader, SourceNote } from "./ui";
import { program, structure, sourceDocument } from "../curriculumData";

export default function Structure() {
  return <div className="page-stack"><PageHeader eyebrow="CURRICULUM STRUCTURE" title="โครงสร้างหลักสูตร" lead={`${program.duration} รวมไม่น้อยกว่า ${program.totalCredits} หน่วยกิต`} />
    <div className="structure-list">{structure.map((item) => <Link to={`/structure/${item.id}`} className="structure-row" key={item.id}><div><h2>{item.label}</h2><p>{item.detail}</p></div><strong>{item.credits}<small>หน่วยกิต</small></strong></Link>)}</div>
    <SourceNote>{sourceDocument}</SourceNote></div>;
}
