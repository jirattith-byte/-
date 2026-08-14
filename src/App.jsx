import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SiteNav from "./SiteNav";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import Structure from "./pages/Structure";
import StructureDetail from "./pages/StructureDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Plan from "./pages/Plan";
import Graph from "./pages/Graph";
import Faculty from "./pages/Faculty";
import Obe from "./pages/Obe";
import Plos from "./pages/Plos";
import PloDetail from "./pages/PloDetail";
import Ylos from "./pages/Ylos";
import YloDetail from "./pages/YloDetail";
import Clo from "./pages/Clo";
import Teaching from "./pages/Teaching";
import Assessment from "./pages/Assessment";
import KsaPedagogy from "./pages/KsaPedagogy";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import References from "./pages/References";
import NotFound from "./pages/NotFound";
import CodeTip from "./CodeTip";
import { getCodeInfo } from "./codeInfo";

export default function App() {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const close = () => setTip(null);
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const showCodeTip = (event) => {
    if (window.innerWidth < 560) return;
    const target = event.target.closest("[data-code]");
    if (!target) return;
    const info = getCodeInfo(target.dataset.code);
    if (!info) return;
    const rect = target.getBoundingClientRect();
    setTip({ info, x: Math.min(rect.left, window.innerWidth - 330), y: rect.bottom + 8 });
  };

  const hideCodeTip = (event) => {
    const target = event.target.closest("[data-code]");
    if (target && !target.contains(event.relatedTarget)) setTip(null);
  };

  return (
    <div className="site" onMouseOver={showCodeTip} onMouseOut={hideCodeTip}>
      <header className="site-head"><div className="wrap head-in">
        <Link to="/" className="brand"><span className="brand-mark">AS</span><span className="brand-txt"><b>สัตวศาสตร์</b><small>คณะเทคโนโลยีการเกษตร · มหาวิทยาลัยกาฬสินธุ์</small></span></Link>
        <div className="head-chips"><span className="chip">122 หน่วยกิต</span><span className="chip">PLO 5 ข้อ</span><span className="chip">4 ชั้นปี</span></div>
      </div></header>
      <SiteNav />
      <div className="shell">
        <Sidebar />
        <div className="shell-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/structure/:id" element={<StructureDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:code" element={<CourseDetail />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/obe" element={<Obe />} />
            <Route path="/plo" element={<Plos />} />
            <Route path="/plo/:id" element={<PloDetail />} />
            <Route path="/ylo" element={<Ylos />} />
            <Route path="/ylo/:id" element={<YloDetail />} />
            <Route path="/clo" element={<Clo />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/ksa-pedagogy" element={<KsaPedagogy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/refs" element={<References />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <CodeTip tip={tip} />
      <footer className="site-foot"><div className="wrap"><b>หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาสัตวศาสตร์</b><br />คณะเทคโนโลยีการเกษตร มหาวิทยาลัยกาฬสินธุ์<div className="foot-note">ข้อมูลจากเอกสารหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาสัตวศาสตร์ (หลักสูตรปรับปรุง พ.ศ. 2566)</div></div></footer>
    </div>
  );
}
