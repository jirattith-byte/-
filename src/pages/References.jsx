import { PageHeader } from "./ui";
import { sourceDocument } from "../curriculumData";

export default function References() { return <div className="page-stack"><PageHeader eyebrow="REFERENCES" title="ข้อมูลอ้างอิง" lead="แหล่งข้อมูลที่ใช้จัดทำเว็บไซต์" /><article className="reference-card"><span>เอกสารหลัก</span><h2>{sourceDocument}</h2><p>ใช้สำหรับข้อมูลทั่วไป โครงสร้างหลักสูตร รายวิชา แผนการเรียน ผลลัพธ์การเรียนรู้ การจัดการเรียนการสอน บุคลากร และอาชีพ</p></article></div>; }
