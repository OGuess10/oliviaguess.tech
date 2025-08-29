import './App.css';
import { useRef, useEffect, useState } from "react";

function Header({scrollToRef, homeRef, aboutRef,  projectsRef, resumeRef, linkedinRef, githubRef, contactRef}) {

  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide immediately
        setVisible(false);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      } else if (window.scrollY < lastScrollY) {
        // scrolling up → show
        setVisible(true);

        // only start auto-hide if not hovering
        if (!hovered) {
          if (scrollTimeout) clearTimeout(scrollTimeout);

          const id = setTimeout(() => {
            if (window.scrollY > 0) setVisible(false);
          }, 1500);

          setScrollTimeout(id);
        }
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovered, scrollTimeout]);

  // Hover zone handlers
  const handleMouseEnter = () => {
    setHovered(true);
    if (scrollTimeout) clearTimeout(scrollTimeout);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);

    // start timeout when mouse leaves
    const id = setTimeout(() => {
      if (window.scrollY > 0) setVisible(false);
    }, 1500);

    setScrollTimeout(id);
  };


  return (
    <>
    {/* Invisible */}
    <div className={`fixed h-28 w-full z-40 bg-transparent ${visible ? "-translate-y-24" : "translate-y-0"}`}
      onMouseEnter={handleMouseEnter}
    />

    {/* Header */}
    <div className={`fixed top-5 w-3/4 h-16 justify-self-center items-center border-cream border-2 rounded-full grid grid-cols-3 z-30 bg-navy transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-24"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-2 w-full h-full items-center flex">
        <button
          className="px-5 bg-gold rounded-full text-navy font-bold text-5xl hover:bg-cream transition-all duration-300"
          onClick={() => scrollToRef(homeRef)}>OG</button>
      </div>
      <div className="flex justify-center">
        <button
          className="text-cream text-lg px-10 hover:bg-cream hover:text-navy py-2 mx-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(homeRef)}>HOME</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(aboutRef)}>ABOUT</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(projectsRef)}>PROJECTS</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(aboutRef)}>RESUME</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(aboutRef)}>LINKEDIN</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(aboutRef)}>GITHUB</button>
        <button
          className="text-cream text-lg px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
          onClick={() => scrollToRef(aboutRef)}>CONTACT</button>
      </div>
      <div></div>
    </div>
    
    </>
  );
}

function App() {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const resumeRef = useRef(null);
  const linkedinRef = useRef(null);
  const githubRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>

      <Header scrollToRef={scrollToRef}
        homeRef={homeRef}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        resumeRef={resumeRef}
        linkedinRef={linkedinRef}
        githubRef={githubRef}
        contactRef={contactRef}/>

      {/* Home Page */}
      <section
        ref={homeRef}
        className="w-screen h-screen m-0 justify-center items-center flex flex-col pt-20">

        {/* Body */}
        <div className="h-full w-5/6 flex justify-center items-center px-10 flex space-x-[-45px] my-10">
          
          {/* Card 1 */}
          <div className="relative h-full w-1/3 bg-cream shadow-xl rounded-full p-5 flex items-center justify-center transition-all duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-10 pt-20">
              <p className="text-navy text-xl font-bold">Currently seeking full-time, remote positions in:</p>
              <ul className="text-navy text-lg list-disc">
                <li>Software Engineering</li>
                <li>Frontend Development</li>
                <li>Human-Computer Interaction</li>
                <li>Visualization</li>
              </ul>
              <p className="text-navy text-xl font-bold mt-5 pt-2">Expected MS in Computer Science</p>
              <p className="text-navy text-lg">Washington University in St. Louis</p>
              <p className="text-navy text-md">December 2025</p>
              <p className="text-navy text-xl font-bold mt-5 pt-2">BS in Computer Science</p>
              <p className="text-navy text-lg">University of Missouri</p>
              <p className="text-navy text-md">May 2024</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative z-10 h-full w-1/3 bg-gold rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-all duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-cream border-2 items-center justify-center flex p-10">
              <svg
                viewBox="0 0 200 100"
                className="absolute top-20 left-1/2 -translate-x-1/2 w-full overflow-visible"
              >
                <path
                  id="curve"
                  d="M 0,150 A 100,150 0 0,1 200,150"
                  fill="transparent"
                />
                <text className="fill-navy text-xl tracking-widest">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    portfolio
                  </textPath>
                </text>
              </svg>
              <div className="flex flex-col">
                <p className="text-navy text-5xl mb-8">&#9826;</p>
                <p className="text-navy text-8xl tracking-wide mb-8">
                  Olivia Guess
                </p>
                <p className="text-navy text-5xl">&#9826;</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-full w-1/3 bg-cream shadow-lg rounded-full p-5 flex items-center justify-center transition-all duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-5">
              <div className="bg-[url('/public/professional-photo.png')] h-full w-full bg-cover bg-center rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="w-5/6 h-1/6 justify-center items-center flex flex-col">
          <p className="text-cream text-xl">see more below</p>
          <p className="text-cream text-m">aekrgnelkjrngejknr</p>
        </div>

      </section>

      {/* About Page */}
      <section
        ref={aboutRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
      </section>

      {/* Projects Page */}
      <section
        ref={projectsRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
      </section>

      {/* Contact Page */}
      <section
        ref={contactRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
      </section>

    </div>
  );
}

export default App;
