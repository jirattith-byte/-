// ซิงก์จาก: Anim Sci/03_OBE_PLO_Design_2570/01_Stakeholder_Needs.md

export const PRIO_INFO = {
  pending: { label: "รอจัดระดับ", color: "#64748b" },
  high: { label: "สูง", color: "#b42318" },
  medium: { label: "กลาง", color: "#b54708" },
  low: { label: "ต่ำ", color: "#175cd3" },
};

export const NEED_LEVEL = {
  pending: { label: "รอจัดระดับ", color: "#64748b" },
  critical: { label: "จำเป็นมาก", color: "#b42318" },
  important: { label: "สำคัญ", color: "#b54708" },
  supporting: { label: "สนับสนุน", color: "#175cd3" },
};

export const STAKEHOLDERS = [
  { id: "SH1", name: "ผู้ประกอบการ", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH2", name: "ศิษย์เก่า", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH3", name: "นักศึกษาปัจจุบัน", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH4", name: "ผู้ปกครอง", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH5", name: "อาจารย์ผู้สอน", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH6", name: "หน่วยงานภาครัฐในพื้นที่", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH7", name: "สภาวิชาชีพ", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
  { id: "SH8", name: "ครูแนะแนวโรงเรียนมัธยม", method: "รอกำหนดวิธีเก็บข้อมูล", n: "รอเก็บข้อมูล", period: "รอเก็บข้อมูล", prio: "pending" },
];

export const NEEDS = Array.from({ length: 18 }, (_, index) => ({
  id: `N${index + 1}`,
  text: "รอเก็บข้อมูลความต้องการ",
  level: "pending",
  sh: [],
  source: "รอหลักฐาน",
}));
