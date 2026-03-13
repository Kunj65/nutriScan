import { useEffect } from "react";
import AboutSection from "./AboutSection";
// import DailyPlannerFeature from "./dailyPlanner/DailyPlannerFeature";

import TimeLineContent from "./TimeLineContent";
import FooterMain from "./FooterMain";
import NavMenu from "./NavMenu";
import HeroSection2 from "./herosection/HeroSection2";


const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavMenu />
      <HeroSection2 />
      <AboutSection />
      {/* <DailyPlannerFeature /> */}
      <TimeLineContent />

      <FooterMain />
    </div>
  );
};

export default MainPage;
