import {Hero3} from "@/components/hero3.tsx";
import {TopAnimation} from "@/components/top-animaiton.tsx";
import {Feature17} from "@/components/feature17.tsx";
import {Faq1} from "@/components/faq1.tsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import About from "@/components/About-componet.tsx";


function Landing() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      <TopAnimation>
        <Hero3/>
      </TopAnimation>
      <TopAnimation>
        <Feature17/>
      </TopAnimation>
      <TopAnimation>
        <Faq1/>
      </TopAnimation>
      <TopAnimation>
        <About/>
      </TopAnimation>
    </>
  );
}

export default Landing;