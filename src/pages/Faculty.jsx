import { PageHeader, SourceNote } from "./ui";
import { facultyMembers, program, sourceDocument } from "../curriculumData";

export default function Faculty() {
  return <div className="page-stack"><PageHeader eyebrow="PROGRAM FACULTY" title="อาจารย์ผู้รับผิดชอบหลักสูตร" lead={program.faculty} />
    <div className="people-grid">{facultyMembers.map((person) => <article className="person-card" key={person.name}><span>{person.title}</span><h2>{person.name}</h2><p>{person.qualifications}</p></article>)}</div><SourceNote>{sourceDocument}</SourceNote></div>;
}
