import { PageHeader, Section, SourceNote } from "./ui";
import { pathways, sourceDocument, ylos } from "../curriculumData";

export default function Plan() {
  return <div className="page-stack"><PageHeader eyebrow="STUDY PLAN" title="แผนการเรียนและเส้นทางประสบการณ์วิชาชีพ" lead="หลักสูตรกำหนดแผนการเรียน 4 ปี และมีทางเลือกด้านประสบการณ์วิชาชีพ" />
    <Section title="พัฒนาการรายชั้นปี"><div className="timeline">{ylos.map((ylo) => <div className="timeline-item" key={ylo.id}><span>{ylo.year}</span><p>{ylo.text}</p></div>)}</div></Section>
    <Section title="ทางเลือกประสบการณ์วิชาชีพ"><div className="feature-grid">{pathways.map((path) => <article className="feature-card" key={path.title}><span>{path.electiveCredits + path.experienceCredits} หน่วยกิต</span><h3>{path.title}</h3><p>{path.courses}</p><small>วิชาชีพเลือก {path.electiveCredits} · ฝึกประสบการณ์ {path.experienceCredits}</small></article>)}</div></Section>
    <SourceNote>{sourceDocument}</SourceNote></div>;
}
