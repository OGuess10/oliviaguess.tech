import './App.css';
import { useRef, useEffect, useState } from "react";
import { useSwipeable } from 'react-swipeable';

function Header({scrollToRef, homeRef, aboutRef,  projectsRef, resumeRef, linkedinRef, githubRef, contactRef}) {

  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };


  return (
    <>
    {/* Invisible */}
    <div className={`fixed h-28 w-full z-40 bg-transparent xl:block hidden ${visible ? "-translate-y-24" : "translate-y-0"}`}
      onMouseEnter={handleMouseEnter}
    />

    {/* Header for Desktop */}
    <div className={`fixed top-5 w-3/4 h-16 justify-self-center items-center border-cream border-2 rounded-full grid grid-cols-3 z-30 bg-navy transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-24"} xl:flex hidden`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-2 w-full h-full items-center flex">
        <button
          className="px-5 bg-gold rounded-full text-navy font-bold text-5xl font-serif hover:bg-cream transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(homeRef)}>OG</button>
      </div>
      <div className="flex justify-center">
        <button
          className="text-cream font-sans text-lg px-10 hover:bg-cream hover:text-navy py-2 mx-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(homeRef)}>HOME</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>ABOUT</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(projectsRef)}>PROJECTS</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>RESUME</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>LINKEDIN</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>GITHUB</button>
        <button
          className="text-cream text-lg font-sans px-5 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>CONTACT</button>
      </div>
      <div></div>
    </div>

    {/* Mobile popout menu */}
    <div className="fixed top-0 left-0 z-50 m-8 p-0 xl:hidden justify-center items-center flex flex-col bg-navy border-cream border-2 rounded-full w-24">

      <button onClick={toggleMobileMenu} className="size-10 my-1 px-2 text-white text-4xl font-sans rounded-full justify-self-start align hover:bg-gold hover:text-navy transition-all duration-300">
        <p className="relative -top-1">&#8801;</p>
      </button>

      <div className={`flex flex-col overflow-hidden transition-all duration-1000 ease-in-out
      ${mobileMenuOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <button
          className="text-cream font-sans text-sm px-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(homeRef)}>HOME</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>ABOUT</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(projectsRef)}>PROJECTS</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>RESUME</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>LINKEDIN</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>GITHUB</button>
        <button
          className="text-cream text-sm font-sans my-2 hover:bg-cream hover:text-navy py-2 px-2 mb-5 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>CONTACT</button>
      </div>
    </div>
    
    </>
  );
}

function Cards() {
  
  const cards = [

    <div className="bg-gradient-to-br from-lightgold via-gold to-darkgold h-full w-full shadow-xl rounded-full p-5">
      <div className="h-full w-full rounded-full border-cream border-2 items-center justify-center flex p-10 select-none">
        <svg
          viewBox="0 0 200 100"
          className="absolute top-20 left-1/2 -translate-x-1/2 w-full overflow-visible"
        >
          <path
            id="curve"
            d="M 0,150 A 100,150 0 0,1 200,150"
            fill="transparent"
          />
          <text className="fill-navy text-lg xl:text-xl tracking-widest font-sans">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              portfolio
            </textPath>
          </text>
        </svg>
        <div className="flex flex-col justify-center items-center">
          <p className="text-navy text-5xl mb-16">&#9826;</p>
          <p className="text-navy text-7xl tracking-wide mb-16 font-serif font-bold xl:text-8xl text-center">
            Olivia Guess
          </p>
          <p className="text-navy text-5xl">&#9826;</p>
        </div>
      </div>
    </div>,

    <div className="bg-cream shadow-xl h-full w-full rounded-full p-5">
      <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-10 pt-20 select-none">
        <p className="text-navy text-lg lg:text-xl font-bold font-sans">Currently seeking full-time, remote positions in:</p>
        <ul className="text-navy text-md lg:text-lg list-disc font-sans">
          <li>Software Engineering</li>
          <li>Frontend Development</li>
          <li>Human-Computer Interaction</li>
          <li>Visualization</li>
        </ul>
        <p className="text-navy text-lg lg:text-xl font-bold mt-5 pt-2 font-sans">Expected MS in Computer Science</p>
        <p className="text-navy text-mg lg:text-lg font-sans">Washington University in St. Louis</p>
        <p className="text-navy text-sm lg:text-md font-sans">December 2025</p>
        <p className="text-navy text-lg lg:text-xl font-bold font-sans mt-5 pt-2">BS in Computer Science</p>
        <p className="text-navy text-md lg:text-lg font-sans">University of Missouri</p>
        <p className="text-navy text-sm lg:text-md font-sans">May 2024</p>
      </div>
    </div>,

    <div className="bg-cream shadow-xl rounded-full p-5 h-full w-full">
      <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-5">
        <div className="bg-[url('/public/professional-photo.png')] h-full w-full bg-cover bg-center rounded-full"></div>
      </div>
    </div>
  ];
  
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c + 1) % cards.length);
  const next = () => setCurrent((c) => (c - 1 + cards.length) % cards.length);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const total = cards.length;

  return (
    <>
      {/* Carousel only if screen is small */}
      <div {...handlers}
        className="xl:hidden relative w-full flex justify-center items-center mt-10 h-[700px]"
      >
      <div className="hidden md:flex relative w-3/4 justify-between self-start flex-row px-20 select-none opacity-50 my-8">
        <div className="flex flex-row">
          <p className="text-cream text-3xl motion-safe:animate-pulse-long">&#10216;</p>
          <p className="text-cream text-3xl px-16 motion-safe:animate-pulse-med">&#10216;</p>
          <p className="text-cream text-3xl motion-safe:animate-pulse-short">&#10216;</p>
        </div>
        <div className="flex flex-row">
          <p className="text-cream text-3xl motion-safe:animate-pulse-short">&#10217;</p>
          <p className="text-cream text-3xl px-16 motion-safe:animate-pulse-med">&#10217;</p>
          <p className="text-cream text-3xl motion-safe:animation-pulse-long">&#10217;</p>
        </div>
      </div>
        <div>
          {cards.map((card, index) => {

            let cardClasses = "absolute w-[300px] h-[600px] lg:w-[400px] lg:h-[700px] transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            const pos = (index - current + total) % total;

            if (pos === 0) {
              cardClasses += " scale-100 z-20";
            } else if (pos === 1) {
              cardClasses += " scale-90 left-1/3 z-10 hover:scale-95 opacity-85";
            } else if (pos === total - 1) {
              cardClasses += " scale-90 left-2/3 z-10 hover:scale-95 opacity-85";
            } else {
              cardClasses += " hidden";
            }

            return (
              <div key={index} className={cardClasses} onClick={() => pos !== 0 && setCurrent(index)}>
                {card}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop layout for large screens */}
      <div className="hidden xl:flex justify-center items-center overflow-visible -space-x-12 px-5 mt-10">
          
          {/* Card 1 */}
          <div className="relative flex-none w-[380px] h-[660px] bg-cream shadow-xl rounded-full p-5 flex items-center justify-center transition-transform duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-10 pt-20">
              <p className="text-navy text-sm text-xl font-bold font-sans">Currently seeking full-time, remote positions in:</p>
              <ul className="text-navy text-lg list-disc font-sans">
                <li>Software Engineering</li>
                <li>Frontend Development</li>
                <li>Human-Computer Interaction</li>
                <li>Visualization</li>
              </ul>
              <p className="text-navy text-xl font-bold mt-5 pt-2 font-sans">Expected MS in Computer Science</p>
              <p className="text-navy text-lg font-sans">Washington University in St. Louis</p>
              <p className="text-navy text-md font-sans">December 2025</p>
              <p className="text-navy text-xl font-bold font-sans mt-5 pt-2">BS in Computer Science</p>
              <p className="text-navy text-lg font-sans">University of Missouri</p>
              <p className="text-navy text-md font-sans">May 2024</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex-none z-10 w-[380px] h-[660px] bg-gradient-to-br from-lightgold via-gold to-darkgold rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-transform duration-300 hover:z-20 hover:scale-110">
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
                <text className="fill-navy text-xl tracking-widest font-sans">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    portfolio
                  </textPath>
                </text>
              </svg>
              <div className="flex flex-col">
                <p className="text-navy text-5xl mb-8 mr-8">&#9826;</p>
                <p className="text-navy text-8xl tracking-wide mb-8 font-serif font-bold">
                  Olivia Guess
                </p>
                <p className="text-navy text-5xl ml-8">&#9826;</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex-none w-[380px] h-[660px] bg-cream rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-transform duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-5">
              <div className="bg-[url('/public/professional-photo.png')] h-full w-full bg-cover bg-center rounded-full"></div>
            </div>
          </div>
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
        className="w-screen h-screen justify-center items-center flex flex-col overflow-auto">

        <Cards/>

        <button
          className="justify-center items-center flex animate-bounce m-10 rounded-full text-navy text-xl hover:bg-gold hover:opacity-100 transition-all duration-300 size-10 bg-cream opacity-50"
        >
          &#8595;
        </button>

      </section>

      {/* About Page */}
      <section
        ref={aboutRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
          {/* Body */}
          <div className="flex w-full h-full gap-10 grid grid-cols-3 grid-rows-1">

            {/* Photo */}
            <div className="bg-[url('/public/chicago-pic.png')] bg-cover bg-center"/>

            {/* About Content */}
            <div className="flex flex-col col-span-2 gap-6 overflow-auto">
              <p className="text-cream text-7xl font-serif font-bold">About</p>
              <p className="text-cream text-xl font-sans">Hi, my name is Olivia Guess and I am planning to graduate with a Master's in Computer Science this December from Washington University in St. Louis.</p>
              <p className="text-cream text-xl font-sans">
                I am a student assistant researcher at the{' '}
                <a href="https://visualdata.wustl.edu/" target="_blank" className="text-cream text-xl font-sans underline decoration-1 hover:text-gold">VIBE lab</a>
                {' '}(Visual Interface & Behavior Exploration Lab). My current research includes topics on visualization, human-computer interaction, and visualization literacy.</p>
              <p className="text-cream text-xl font-sans">
                I also have experience as an undergraduate student assistant research at the{' '}
                <a href="https://mizzoumotioncenter.com/" target="_blank" className="text-cream text-xl font-sans underline decoration-1 hover:text-gold">MAC</a>
                {' '}(Mizzou Motion Analysis Center) at the University of Missouri. This research included developing the software for the{' '}
                <a href="https://mizzoumotioncenter.com/technologies.html" target="_blank" className="text-cream text-xl font-sans underline decoration-1 hover:text-gold">Mizzou Point-of-Care Assessment System (MPASS)</a>
                .
              </p>
              <p className="text-cream text-xl font-sans">
                Through my research and education, I have gained technical skills in:
              </p>
              <ul className="text-cream text-lg list-disc font-sans px-10">
                <li>
                  <b>Web Development</b>
                  <ul>
                    <li>React</li>
                    <li>React Native</li>
                  </ul>
                </li>
                <li>
                  <b>Embedded Devices</b>
                  <ul>
                    <li>Arduino</li>
                  </ul>
                </li>
                <li><b>React/React Native</b> (HTML, JavaScript, CSS)</li>
                <li><b>Tailwind</b></li>
                <li><b>Windows Forms</b> (C#, C)</li>
                <li><b>Python</b></li>
                <li><b>Unity</b></li>
                <li><b>Databases</b> (SQL, MySQL, AmazonDB, PHP)</li>
                <li><b>MATLAB</b></li>
                <li><b>Wolfram Mathematica</b></li>
                <li><b>Linux Virtual Machine</b></li>
                <li><b>Adobe Creative Suite</b></li>
                <li><b>Figma</b></li>
                <li><b>Microsoft Office</b></li>
              </ul>
            </div>
          </div>
      </section>

      {/* Projects Page */}
      <section
        ref={projectsRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
          {/* Body */}
          <div className="h-full w-full flex items-center px-10 flex my-10">
          <p>The MPASS uses three different devices (a forceplate, motion-capture camera, and reaction board) to perform clinical assessments. These assessments can aid with a variety of applications ranging from sport (athlete rehabilitation) to clinical (aids with concussion detection and mild coginitive impairment).</p>
          </div>
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
