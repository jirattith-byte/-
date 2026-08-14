import { NEEDS, STAKEHOLDERS } from "./obeData.js";

export const CODE_INFO = Object.fromEntries([
  ...STAKEHOLDERS.map((item) => [item.id, { code: item.id, title: item.name, text: `${item.method} · ขนาดกลุ่มตัวอย่าง: ${item.n} · ช่วงเวลา: ${item.period}` }]),
  ...NEEDS.map((item) => [item.id, { code: item.id, title: "ความต้องการ", text: `${item.text} · ที่มา: ${item.source}` }]),
]);

export function getCodeInfo(code) {
  return CODE_INFO[code] ?? null;
}
