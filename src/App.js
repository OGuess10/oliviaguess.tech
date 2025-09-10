import './App.css';
import { useRef, useEffect, useState, useId } from "react";
import { useSwipeable } from 'react-swipeable';
import { ReactTyped } from 'react-typed';

function Header({scrollToRef, homeRef, aboutRef,  skillsRef, projectsRef, contactRef}) {

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
    <div className={`fixed top-5 w-3/4 h-16 justify-self-center items-center content-center bg-powderblue border-white border-2 rounded-full 2xl:grid-cols-3 z-30 shadow-xl transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-24"} xl:grid hidden`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-2 w-full h-full items-center flex">
        <button
          className="px-5 bg-lightgold rounded-full text-navy font-bold text-5xl font-serif hover:bg-white transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(homeRef)}>OG</button>
      </div>
      <div className="flex justify-center">
        <button
          className="text-navy font-sans text-lg px-10 hover:bg-white py-2 mx-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(homeRef)}>HOME</button>
        <button
          className="text-navy text-lg font-sans px-10 mx-2 hover:bg-white py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>ABOUT</button>
        <button
          className="text-navy text-lg font-sans px-10 mx-2 hover:bg-white py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(skillsRef)}>SKILLS</button>
        <button
          className="text-navy text-lg font-sans px-10 mx-2 hover:bg-white py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(projectsRef)}>PROJECTS</button>
        <button
          className="text-navy text-lg font-sans px-10 mx-2 hover:bg-white py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          onClick={() => scrollToRef(aboutRef)}>CONTACT</button>
      </div>
      <div className="col-span-2"></div>
    </div>

    {/* Mobile popout menu */}
   <div
    className={`fixed top-0 left-0 z-50 m-8 p-0 xl:hidden rounded-full w-24 transition-all duration-500
    ${mobileMenuOpen ? "border-white border-2 bg-powderblue shadow-xl border-opacity-100" : "border-opacity-0 delay-[650ms]"}`}
  >
    <div
      className={`flex flex-col justify-start items-center overflow-hidden transition-[max-height] duration-1000 ease-in-out
        ${mobileMenuOpen ? "max-h-[500px]" : "max-h-16"}`}
    >
      <button onClick={toggleMobileMenu} className={`size-10 my-1 px-2 pb-10 text-navy text-4xl font-sans rounded-full justify-self-start align hover:bg-white transition-all duration-300 bg-powderblue
      ${mobileMenuOpen ? "border-0 hover:shadow-lg" : "border-white border-2 shadow-lg"}`}>
        <p className="relative -top-1">&#8801;</p>
      </button>

      <button
        className="text-navy font-sans text-sm px-2 hover:bg-white py-2 rounded-full transition-all duration-300 hover:shadow-lg"
        onClick={() => {
          scrollToRef(homeRef);
          toggleMobileMenu();
        }
      }>HOME</button>
      <button
        className="text-navy text-sm font-sans my-2 hover:bg-white py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
        onClick={() => {
          scrollToRef(aboutRef);
          toggleMobileMenu();
        }
      }>ABOUT</button>
      <button
        className="text-navy text-sm font-sans my-2 hover:bg-white py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
        onClick={() => {
          scrollToRef(skillsRef);
          toggleMobileMenu();
        }
      }>SKILLS</button>
      <button
        className="text-navy text-sm font-sans my-2 hover:bg-white py-2 px-2 rounded-full transition-all duration-300 hover:shadow-lg"
        onClick={() => {
          scrollToRef(projectsRef);
          toggleMobileMenu();
        }
      }>PROJECTS</button>
      <button
        className="text-navy text-sm font-sans my-2 hover:bg-white py-2 px-2 mb-5 rounded-full transition-all duration-300 hover:shadow-lg"
        onClick={() => {
          scrollToRef(aboutRef);
          toggleMobileMenu();
        }
      }>CONTACT</button>
    </div>
    </div>

    {mobileMenuOpen && (
      <div className="fixed inset-0 z-30"
        onClick={toggleMobileMenu}
      />
    )}
    
    </>
  );
}

function Cards() {
  
  const cards = [

    <div className="w-full h-full bg-lightgold rounded-full shadow-xl p-5 select-none motion-safe:animate-float">
      <div className="h-full w-full rounded-full border-white border-2 items-center justify-center flex p-10">
        <div className="flex flex-col justify-center items-center">
          <p className="text-navy text-4xl lg:text-5xl mb-8 font-sans">Hi, I am</p>
          <p className="text-navy text-6xl lg:text-8xl tracking-wide mb-8 font-serif font-bold">
            Olivia Guess
          </p>
        </div>
      </div>
    </div>,

    <div className="bg-white shadow-xl rounded-full p-5 w-full h-full">
      <div className="h-full w-full rounded-full border-lightgold border-2 items-center justify-center flex flex-col p-10 select-none gap-4">
        <div className="w-full h-1/3">
          <p className="text-navy text-4xl font-bold font-sans my-4">I am a</p>
          <ReactTyped
            className="font-mono text-xl text-navy overflow-hidden text-center"
            typeSpeed={40}
            backDelay={1500}
            backSpeed={50}
            loop
            strings={[
              "CS Master's Student",
              "Student Assistant Researcher"
            ]}
          />
        </div>
        <div className="w-full">
          <p className="text-navy text-xl font-bold font-sans my-2">I am currently seeking full-time, remote positions in:</p>
          <ul className="text-navy text-lg list-disc font-sans ml-4">
            <li>Software Engineering</li>
            <li>Frontend Development</li>
          </ul>
        </div>
      </div>
    </div>,

    <div className="bg-white shadow-xl rounded-full p-5 h-full w-full">
      <div className="h-full w-full rounded-full border-lightgold border-2 items-center justify-center flex flex-col p-5">
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
        {/* <div className="hidden md:flex relative w-3/4 justify-between self-end flex-row px-20 select-none opacity-50 my-8">
          <div className="flex flex-row">
            <p className="text-navy text-3xl motion-safe:animate-pulse-long">&#10216;</p>
            <p className="text-navy text-3xl px-16 motion-safe:animate-pulse-med">&#10216;</p>
            <p className="text-navy text-3xl motion-safe:animate-pulse-short">&#10216;</p>
          </div>
          <div className="flex flex-row">
            <p className="text-navy text-3xl motion-safe:animate-pulse-short">&#10217;</p>
            <p className="text-navy text-3xl px-16 motion-safe:animate-pulse-med">&#10217;</p>
            <p className="text-navy text-3xl motion-safe:animate-pulse-long">&#10217;</p>
          </div>
        </div> */}
      </div>

      {/* Desktop layout for large screens */}
      <div className="hidden xl:flex justify-center items-center overflow-visible -space-x-12 px-5 mt-32">
          
          {/* Card 1 */}
          <div className="relative flex-none w-[380px] h-[660px] bg-white shadow-xl rounded-full p-5 flex items-center justify-center transition-transform duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-lightgold border-2 items-center justify-center flex flex-col p-10 pt-20">
              <div className="w-full h-1/3">
                <p className="text-navy text-4xl font-bold font-sans my-4">I am a</p>
                <ReactTyped
                  className="font-mono text-xl text-navy overflow-hidden text-center"
                  typeSpeed={40}
                  backDelay={1500}
                  backSpeed={50}
                  loop
                  strings={[
                    "CS Master's Student",
                    "Student Assistant Researcher"
                  ]}
                />
              </div>
              <div className="w-full">
                <p className="text-navy text-xl font-bold font-sans my-2">I am currently seeking full-time, remote positions in:</p>
                <ul className="text-navy text-lg list-disc font-sans ml-4">
                  <li>Software Engineering</li>
                  <li>Frontend Development</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="motion-safe:animate-float z-10 relative flex-none w-[380px] h-[660px] rounded-full">
          <div className="w-full h-full bg-lightgold rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-transform duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-white border-2 items-center justify-center flex p-10">
              <div className="flex flex-col">
                <p className="text-navy text-5xl mb-8 font-sans">Hi, I am</p>
                <p className="text-navy text-8xl tracking-wide mb-8 font-serif font-bold">
                  Olivia Guess
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex-none w-[380px] h-[660px] bg-white rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-transform duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-lightgold border-2 items-center justify-center flex flex-col p-5">
              <div className="bg-[url('/public/professional-photo.png')] h-full w-full bg-cover bg-center rounded-full"></div>
            </div>
          </div>
        </div>
      
    </>
  );
}

function Circles({image, text, overrides=""}){

  return (
    <div className="relative group h-[100px] w-[100px] bg-white shadow-xl rounded-full p-2 my-2 mx-4 motion-safe:animate-float select-none hover:z-10">
      <div className="w-full h-full border-2 border-lightgold rounded-full p-2">
        <img src={image} alt={text} className={`object-contain h-full w-full ${overrides}`} />
      </div>

      <p className="absolute top-full left-1/2 -translate-x-1/2 bg-powderblue text-navy text-md rounded-xl px-2 py-1 opacity-0 translate-y-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300">
        {text}
      </p>
    </div>

  );
}

function App() {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>

      <Header scrollToRef={scrollToRef}
        homeRef={homeRef}
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        projectsRef={projectsRef}
        contactRef={contactRef}/>

      {/* Home Page */}
      <section
        ref={homeRef}
        className="w-screen h-screen justify-center items-center flex flex-col overflow-auto">

        <Cards/>

        <button
          className="justify-center items-center flex animate-bounce m-10 rounded-full text-navy text-xl hover:bg-lightgold hover:opacity-100 transition-all duration-300 size-10 bg-white opacity-50"
          onClick={() => scrollToRef(aboutRef)}
        >
          &#8595;
        </button>

      </section>

      {/* About Page */}
      <section
        ref={aboutRef}
        className="min-w-screen min-h-screen justify-center items-center flex p-10">
          {/* Body */}
          <div className="w-full h-full gap-y-5 grid grid-cols-1 grid-rows-3 md:gap-x-5 md:grid-cols-3 md:grid-rows-1 md:gap-y-0">

            {/* Photo */}
            <div className="h-full w-full rounded-xl overflow-hidden shadow-xl">
              <div className="bg-[url('/public/chicago-pic.png')] bg-cover bg-center h-full w-full"/>
            </div>

            {/* About Content */}
            <div className="flex flex-row row-span-2 md:flex-col md:col-span-2 h-full w-full shadow-xl rounded-xl p-5 bg-white">
              <div className="border-lightgold border-2 rounded-xl h-full w-full p-5 overflow-y-scroll
                [&::-webkit-scrollbar]:w-4
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-lightgold
                [&::-webkit-scrollbar-thumb]:border-4
                [&::-webkit-scrollbar-thumb]:border-white
                [&::-webkit-scrollbar-thumb]:border-solid"
              >
                <p className="text-navy text-7xl font-serif font-bold mb-8">About</p>
                <p className="text-navy text-xl font-sans my-4">Hello, I'm Olivia, a Master's student in Computer Science at Washington University in St. Louis.</p>
                <p className="text-navy text-xl font-sans my-4">I am a passionate and driven student and researcher. I am currently seeking full-time, remote job opportunities in software engineering, web-development, game development, and UI/UX design.</p>
                <p className="text-navy text-xl font-sans my-4">
                  I am a student assistant researcher at the{' '}
                  <a href="https://visualdata.wustl.edu/" target="_blank" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">VIBE Lab (Visual Interface & Behavior Exploration Lab)</a>
                  . My current research includes topics on visualization, human-computer interaction, and visualization literacy.</p>
                <p className="text-navy text-xl font-sans my-2">
                  I also have experience as an undergraduate student assistant researcher at the{' '}
                  <a href="https://mizzoumotioncenter.com/" target="_blank" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">MAC (Motion Analysis Center)</a>
                  . This research included developing the software for the{' '}
                  <a href="https://mizzoumotioncenter.com/technologies.html" target="_blank" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">Mizzou Point-of-Care Assessment System (MPASS)</a>
                  .
                </p>
                <p className="text-navy text-xl font-sans my-4">
                  My professional experience comes from my internship at{' '}
                  <a href="https://www.garmin.com/en-US/" target="_blank" className="text-naby text-xl font-sans underline decoration-1 hover:text-lightgold">Garmin International, Inc.</a>
                  {' '}located in Olathe, Kansas. I worked as a software engineer intern and worked to develop embedded software on smartwatches.
                </p>
                <p className="text-navy text-xl font-sans my-4">
                  Outside of my research and education, I like to spend my free time taking ballet lessons at my local dance studio, writing stories, and playing video games with my friends.
                </p>
              </div>
            </div>
          </div>
      </section>

      {/* Skills Page */}
      <section
        ref={skillsRef}
        className="min-w-screen min-h-screen justify-center items-center flex p-10 my-8 py-24 flex-col">
          <p className="text-7xl font-serif text-navy font-bold flex w-full justify-start">My Skills</p>
          <div className="w-full flex flex-col items-center p-8 bg-white rounded-xl shadow-xl my-8">
            <p className="text-navy text-3xl font-serif flex justify-self-start self-start w-full">Technical Languages</p>
            <div className="w-5/6 h-full flex flex-wrap my-5 justify-center">
              <Circles className="group group-hover:z-50" image={process.env.PUBLIC_URL + '/icons/Python-04.svg'} text={'Python'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/C-01.svg'} text={'C/C++'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/C-Sharp-01.svg'} text={'C#'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/JavaScript-01.svg'} text={'JavaScript'} overrides={'p-2'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Swift-01.svg'} text={'Swift'} overrides={'pr-2'}/>
            </div>
          </div>
          <div className="w-full flex flex-col items-center p-8 bg-white rounded-xl shadow-xl">
            <p className="text-navy text-3xl font-serif flex justify-self-start self-start w-full">Technologies and Frameworks</p>
            <div className="w-5/6 h-full flex flex-wrap my-5 justify-center">
              <Circles image={process.env.PUBLIC_URL + '/icons/React-01.svg'} text={'React'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Logo_D3.png'} text={'D3'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/winforms-logo.png'} text={'WinForms'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Arduino-01.svg'} text={'Arduino'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Github-22.svg'} text={'GitHub/Github Issues'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Git-06.svg'} text={'Git'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Unity-01.svg'} text={'Unity'} overrides={'pr-2'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Flask-06.svg'} text={'Flask'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Mysql-02.svg'} text={'MySQL/SQL'} overrides={'p-2'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Wolfram-mathematica-01.svg'} text={'Wolfram Mathematica'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Linux-ubuntu-01.svg'} text={'Ubuntu/Linux'} overrides={'pr-2'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Figma-01.svg'} text={'Figma'}/>
              <Circles image={process.env.PUBLIC_URL + '/icons/Adobe-02.svg'} text={'Adobe Creative Suite'} overrides={'p-1'}/>
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
