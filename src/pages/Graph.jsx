import { PageHeader, SourceNote } from "./ui";
import { sourceDocument, structure } from "../curriculumData";

export default function Graph() {
  return <div className="page-stack"><PageHeader eyebrow="CURRICULUM MAP" title="กราฟโครงสร้างหลักสูตร" lead="ภาพรวมสัดส่วนหน่วยกิตตามหมวดที่กำหนดในเอกสารหลักสูตร" />
    <div className="credit-bar" aria-label="สัดส่วนหน่วยกิต">{structure.map((item) => <div key={item.id} style={{ flex: item.credits }} title={`${item.label} ${item.credits} หน่วยกิต`}><span>{item.credits}</span></div>)}</div>
    <div className="legend">{structure.map((item, index) => <div key={item.id}><i data-color={index} /><span>{item.label}</span><strong>{item.credits}</strong></div>)}</div>
    <SourceNote>{sourceDocument}</SourceNote></div>;
}
