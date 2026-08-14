export const NAV_GROUPS = [
  { id: "home", label: "หน้าแรก", to: "/", end: true, solo: true },
  {
    id: "curriculum", label: "หลักสูตร", hint: "โครงสร้าง รายวิชา และลำดับการเรียน",
    items: [
      { to: "/structure", label: "โครงสร้างหลักสูตร", desc: "122 หน่วยกิต แยกตามหมวดและกลุ่มวิชา" },
      { to: "/courses", label: "รายวิชา", desc: "รายวิชาและรายละเอียดรายตัว" },
      { to: "/plan", label: "แผนการเรียน", desc: "แผน 4 ปี และประสบการณ์วิชาชีพ" },
      { to: "/graph", label: "กราฟหลักสูตร", desc: "สัดส่วนและความสัมพันธ์ของหลักสูตร" },
      { to: "/faculty", label: "อาจารย์ประจำหลักสูตร", desc: "อาจารย์ผู้รับผิดชอบหลักสูตร 5 ท่าน" },
    ],
  },
  {
    id: "outcomes", label: "ผลลัพธ์การเรียนรู้", hint: "ตั้งแต่ความต้องการผู้มีส่วนได้ส่วนเสียถึงรายวิชา",
    items: [
      { to: "/obe", label: "ขั้นตอน OBE", desc: "ผู้มีส่วนได้ส่วนเสียและความต้องการ", sections: [
        { id: "sh", label: "① ผู้มีส่วนได้ส่วนเสีย" }, { id: "needs", label: "② ความต้องการ" },
      ] },
      { to: "/plo", label: "PLO", desc: "ผลลัพธ์ระดับหลักสูตร 5 ข้อ" },
      { to: "/ylo", label: "YLO", desc: "ผลลัพธ์รายชั้นปี 4 ระดับ" },
      { to: "/clo", label: "CLO รายวิชา", desc: "จุดเชื่อมโยงผลลัพธ์ระดับรายวิชา" },
    ],
  },
  {
    id: "teaching", label: "การเรียนการสอน", hint: "กลยุทธ์การสอนและการวัดผล",
    items: [
      { to: "/teaching", label: "กลยุทธ์การสอน", desc: "แนวทางและกิจกรรมการเรียนรู้" },
      { to: "/assessment", label: "การวัดและประเมินผล", desc: "วิธีประเมินและหลักฐานการเรียนรู้" },
      { to: "/ksa-pedagogy", label: "กลยุทธ์รายข้อ KSA", desc: "ความรู้ ทักษะ และคุณลักษณะ" },
    ],
  },
  {
    id: "market", label: "ตลาดแรงงาน", hint: "อาชีพและพื้นที่การทำงาน",
    items: [
      { to: "/careers", label: "เส้นทางอาชีพ", desc: "อาชีพหลังสำเร็จการศึกษา" },
      { to: "/jobs", label: "กลุ่มงานและหน่วยงาน", desc: "ภาคธุรกิจ ภาครัฐ และองค์กร" },
    ],
  },
  { id: "refs", label: "ข้อมูลอ้างอิง", to: "/refs", solo: true },
];

export function findNav(pathname) {
  for (const group of NAV_GROUPS) {
    if (group.solo) {
      if (group.end ? pathname === group.to : pathname.startsWith(group.to)) return { group, item: null };
      continue;
    }
    for (const item of group.items) {
      if (pathname === item.to || pathname.startsWith(`${item.to}/`)) return { group, item };
    }
  }
  return { group: null, item: null };
}
