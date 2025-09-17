import './App.css';
import { useRef, useEffect, useState } from "react";
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
          onClick={() => scrollToRef(contactRef)}>CONTACT</button>
      </div>
      <div className="col-span-2"></div>
    </div>

    {/* Mobile popout menu */}
   <div
    className={`fixed top-0 left-0 z-50 my-4 mx-0 sm:m-8 p-0 xl:hidden rounded-full w-24 transition-all duration-500
    ${mobileMenuOpen ? "border-white border-2 bg-powderblue shadow-xl border-opacity-100" : "border-opacity-0 delay-[700ms]"}`}
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
          scrollToRef(contactRef);
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
      <div className="h-full w-full rounded-full border-lightgold border-2 items-center justify-center flex flex-col p-10 select-none gap-2">
        <div className="w-full min-h-36 flex flex-col justify-start pt-4">
          <p className="text-navy text-4xl font-bold font-sans">I am a</p>
          <ReactTyped
            className="font-mono text-xl text-navy overflow-hidden text-start"
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
        <div className="flex w-full justify-around items-center p-4 pt-8">
          <a href="https://www.linkedin.com/in/olivia-guess" target="_blank" rel="noreferrer">
            <img src={process.env.PUBLIC_URL + '/icons/Linkedin-13.svg'} alt="LinkedIn" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
          </a>
          <a href="https://github.com/OGuess10" target="_blank" rel="noreferrer">
            <img src={process.env.PUBLIC_URL + '/icons/Github-22.svg'} alt="GitHub" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
          </a>
          <a href={process.env.PUBLIC_URL + '/OliviaGuessResume.pdf'} target="_blank" rel="noreferrer">
            <img src={process.env.PUBLIC_URL + '/icons/File-earmark-text-01.svg'} alt="Resume" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
          </a>
          <a href="mailto:guesso.olivia@gmail.com" target="_blank" rel="noreferrer">
            <img src={process.env.PUBLIC_URL + '/icons/Paper-plane-11.svg'} alt="Send Email" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
          </a>
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

            let cardClasses = "absolute w-[275px] h-[575px] lg:w-[400px] lg:h-[700px] transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
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
              <div className="flex w-full justify-around items-center p-10">
                <a href="https://www.linkedin.com/in/olivia-guess" target="_blank" rel="noreferrer">
                  <img src={process.env.PUBLIC_URL + '/icons/Linkedin-13.svg'} alt="LinkedIn" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
                </a>
                <a href="https://github.com/OGuess10" target="_blank" rel="noreferrer">
                  <img src={process.env.PUBLIC_URL + '/icons/Github-22.svg'} alt="GitHub" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
                </a>
                <a href={process.env.PUBLIC_URL + '/OliviaGuessResume.pdf'} target="_blank" rel="noreferrer">
                  <img src={process.env.PUBLIC_URL + '/icons/File-earmark-text-01.svg'} alt="Resume" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
                </a>
                <a href="mailto:guesso.olivia@gmail.com" target="_blank" rel="noreferrer">
                  <img src={process.env.PUBLIC_URL + '/icons/Paper-plane-11.svg'} alt="Send Email" className="h-[30px] w-[30px] hover:scale-125 transition-all duration-300" />
                </a>
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

function ProjectTabs(){
  const projects = [
    {
      name: "MPASS",
      body:
      <div className="flex justify-center w-full flex-col">
        <a className="text-navy text-2xl sm:text-4xl font-serif underline decoration-2 hover:text-lightgold" href="https://mizzoumotioncenter.com/technologies.html" target="_blank" rel="noreferrer">Mizzou Point-of-Care Assessment System</a>
        
        <div className="flex flex-wrap gap-4 py-10 items-start">
          <div className="w-full sm:w-[560px] flex-shrink-0 flex rounded-xl overflow-hidden">
            <video className="rounded-xl" controls autoPlay muted>
              <source src="https://mizzoumotioncenter.com/MPASS_Athletic.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="max-w-[400px] flex-1 flex flex-col gap-6 text-navy font-sans text-xl">
            <p>
              The MPASS is a portable device that collects simultaneous data from three different devices (a forceplate, motion-capture camera, and reaction board) to perform clinical assessments. These assessments can aid with a variety of applications ranging from sport (athlete rehabilitation) to clinical (aids with concussion detection and mild cognitive impairment).
            </p>
            <p>
              The MPASS includes 67 custom tests and has been used by researchers and clinicians to collect data for over 200 participants.
            </p>
            <p>
              The MPASS was developed using WinForms and C#.
            </p>
          </div>
        </div>
      </div>
    },
    {
      name: "Portfolio",
      body:
      <div className="flex justify-center w-full flex-col">
        <p className="text-navy text-4xl font-serif">Portfolio Website</p>
        <div className="flex flex-col w-full gap-4 py-10">
          <div className="max-w-[900px] flex-shrink-0">
            <img className="object-contain w-full h-auto" src={process.env.PUBLIC_URL + '/homepage.png'} alt="Home Page of Portfolio Website"/>
          </div>
          <div className="text-navy font-sans text-xl">
            <p>
              This website was made using React and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    },
    {
      name: "Global Mini-VLAT",
      body:
      <div className="flex justify-center w-full flex-col">
        <p className="text-navy text-4xl font-serif">Global Mini-VLAT</p>
        <div className="flex flex-wrap w-full gap-4 py-10">
          <div className="w-full lg:w-[900px] flex-shrink-0">
            <img className="object-contain w-full h-auto" src={process.env.PUBLIC_URL + '/Ghana-VLAT.png'} alt="Choropleth map of Africa and Quiz Question"/>
          </div>
          <div className="flex flex-col gap-6 text-navy font-sans text-xl">
            <p>
              My current research involves creating a global, personalized version of the{' '}
              <a href="https://washuvis.github.io/minivlat/" target="_blank" rel="noreferrer" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">Mini-VLAT (Mini Visualization Literacy Assessment Test) [Pandey & Ottley 2023].</a>
            </p>
            <p>
              Visualization literacy measures how well an individual can interpret visualizations. There are many applications of visualization literacy tests, such as allowing researchers to measure a participant's visualization literacy before conducting a study.
            </p>
            <p>
              The MPASS includes 67 custom tests and has been used by researchers and clinicians to collect data for over 200 participants.
            </p>
            <p>
              The Ghana-VLAT and Global-VLAT are developed using React and TailWind CSS for the frontend and Python Flask for the backend. Data is stored in AWS Database Services.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-navy font-sans text-xl">
          <p>
            One issue with the original Mini-VLAT is that it was catered towards U.S. audiences, so the goal of my research is to create a global assessment that is personalized for different regions across the world.
          </p>
          <p>
            To start, I developed a personalized assessment for individuals residing in Ghana. Using localized data, I created 12 questions along with 12 different chart types to create a Ghana-focused visualization literacy assessment test. The image above displays an example item featuring a choropleth map of Africa.
          </p>
        </div>
      </div>
    },
    {
      name: "MaxCard",
      body:
      <div className="flex justify-center w-full flex-col">
        <a className="text-navy text-4xl font-serif underline decoration-2 hover:text-lightgold" href="https://github.com/ahkim3/MaxCard?tab=readme-ov-file" target="_blank" rel="noreferrer">MaxCard</a>
         <div className="flex flex-wrap gap-4 py-10 items-start">
          <div className="w-full sm:h-[315px] sm:w-[560px] flex-shrink-0 flex rounded-xl overflow-hidden bg-red-200">
            <iframe className="aspect-video" src="https://www.youtube.com/embed/xsYrL3mWZew?si=IhOZxEmmlDrYquYP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/>
          </div>

          <div className="w-full sm:min-w-[400px] flex-1 flex flex-col gap-6 text-navy font-sans text-xl">
            <p>
              Do you have multiple credit cards? If so, do you often struggle choosing the right card to maximize your credit cards' cashback?
            </p>
            <p>
              MaxCard is a mobile application that can help you choose the best credit card to maximize cashback rewards at your location.
            </p>
            <p>
              MaxCard was developed in 2024 as a senior capstone project. For the frontend, MaxCard was developed using React Native and Expo Go. For the backend, MaxCard was developed using AWS (Amazon Web Services), Python Flask, and GCP (Google Cloud Platform).
            </p>
            <p>
              Additional Authors:{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://www.linkedin.com/in/elijah-bollinger/" target="_blank" rel="noreferrer">Elijah Bollinger,</a>{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://www.linkedin.com/in/ahkim3/" target="_blank" rel="noreferrer">Andrew Kim,</a>{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://www.linkedin.com/in/kai-chen-191781235/" target="_blank" rel="noreferrer">Kai Chen,</a>{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://www.linkedin.com/in/tyler-harsell/" target="_blank" rel="noreferrer">Tyler Harsell,</a>{' '}
              {' '}and{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://www.linkedin.com/in/jackson-bowes-b56a69200/" target="_blank" rel="noreferrer">Jackson Bowes</a>
              </p>
          </div>
        </div>
      </div>
    },
    {
      name: "EcoHolic",
      body:
      <div className="flex justify-center w-full flex-col">
        <a className="text-navy text-4xl font-serif underline decoration-2 hover:text-lightgold" href="https://github.com/OGuess10/EcoHolic" target="_blank" rel="noreferrer">EcoHolic</a>
        <div className="flex flex-wrap gap-4 py-10 items-start">
          <div className="w-full sm:w-[300px] flex-shrink-0">
            <img className="object-contain w-full h-auto" src={process.env.PUBLIC_URL + '/ecoholic-1.png'} alt="Home Page of EcoHolic App"/>
          </div>
          <div className="w-full sm:w-[300px] flex-shrink-0">
            <img className="object-contain w-full h-auto" src={process.env.PUBLIC_URL + '/ecoholic-2.png'} alt="Graph Page of EcoHolic App"/>
          </div>
          <div className="w-full sm:min-w-[400px] flex-1 flex flex-col gap-6 text-navy font-sans text-xl">
            <p>
              Do you want to make eco-friendly choices but find it hard to stay motivated or track your impact?

              EcoHolic changes that. It turns everday eco-actions&mdash;like recycling, taking public transit, or using a reusable bottle&mdash;into a fun, reqarding experience.
            </p>
            <p>
              EcoHolic is a mobile application that turns everyday eco-friendly choices into a game! Add points for eco-actions and grow your tree. Compare your progress with your friends and get to the top of the leaderboard. EcoHolic strives to create a gamified, motivational tool to encourage individuals to be more environmentally aware.
            </p>
            <p>
              EcoHolic was developed in 2025 as a software development project. For the frontend, EcoHolic was developed using React Native, Tailwind CSS, and Expo Go. For the backend, Ecoholic was developed using Python Flask. EcoHolic also uses ngrok, Docker, and Kubernetes.
            </p>
            <p>
              Additional authors:{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://github.com/mijung2024" target="_blank" rel="noreferrer">Mijung Jung</a>
              {' '}and{' '}
              <a className="underline decoration-2 hover:text-lightgold" href="https://github.com/sswustl" target="_blank" rel="noreferrer">Sydney Seder</a>
            </p>
          </div>
        </div>
      </div>
    }
  ];

  const [selected, setSelected] = useState(0);
  const [current, setCurrent] = useState(0);

  const total = projects.length;

  const prev = () => setCurrent((c) => (c + 1) % total);
  const next = () => setCurrent((c) => (c - 1 + total) % total);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <>
    <div className="hidden sm:flex flex-col lg:flex-row w-full min-h-full shadow-xl rounded-xl bg-white my-5 p-5">

      {/* Tabs (left side) */}
      <div className="hidden sm:flex sm:flex-row lg:flex-col w-full lg:w-48 bg-white">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`lg:mx-0 mr-2 p-4 text-left text-lg font-serif text-navy transition-all duration-300 lg:rounded-l-xl rounded-t-xl lg:rounded-tr-none
              ${
                selected === index
                    ? "bg-white border-t-4 lg:border-b-4 border-l-4 border-r-4 lg:border-r-0 border-lightgold relative lg:left-1 top-1 lg:top-0"
                  : "hover:bg-powderblue hover:rounded-xl"
              }`}
          >
            {project.name}
          </button>
        ))}
      </div>

      {/* Content (right side) */}
      <div className={`flex-1 p-6 h-full flex flex-col gap-4 border-4 border-lightgold rounded-r-xl overflow-y-scroll
        ${selected !== 0 ? "rounded-l-xl" : "rounded-bl-xl"}`
      }>
        {projects[selected].body}
      </div>
    </div>

    {/* mobile */}
    <div {...handlers}
      className="sm:hidden flex flex-col w-[75vw] items-center h-[75vh] relative my-4"
    >
      {projects.map((project, index) => {

        let cardClasses = "absolute w-full h-full p-4 bg-white rounded-xl shadow-xl transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
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
            <div className="border-2 border-lightgold rounded-xl p-4 h-full overflow-auto">
              {project.body}
            </div>
          </div>
        );
      })}
    </div>
    </>
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
        className="max-w-screen max-h-screen justify-center items-center flex flex-col overflow-auto overscroll-x-none overflow-x-hidden">

        <Cards/>

        <button
          className="justify-center items-center flex animate-bounce mt-10 rounded-full text-navy text-xl hover:bg-lightgold hover:opacity-100 transition-all duration-300 size-10 py-4"
          onClick={() => scrollToRef(aboutRef)}
        >
          &#8595;
        </button>

      </section>

      {/* About Page */}
      <section
        ref={aboutRef}
        className="w-screen min-h-screen max-w-[1440px] justify-self-center items-center flex flex-col p-10"
      >
        <div className="flex grow-1 shadow-xl rounded-xl p-5 bg-white">
          <article className="border-lightgold border-2 rounded-xl p-5 text-navy text-xl font-sans">
            <p className="basis-full text-7xl font-serif font-bold mb-4">About</p>
            <img src={process.env.PUBLIC_URL + '/chicago-pic.png'} alt="Portrait" className="max-h-[400px] rounded-full overflow-hidden shadow-xl object-cover float-right aspect-square" />
            <p className="py-2">Hello, I'm Olivia, a Master's student in Computer Science at Washington University in St. Louis.</p>
            <p className="py-2">I am a passionate and driven student and researcher. I am currently seeking full-time, remote job opportunities in software engineering, web-development, game development, and UI/UX design.</p>
            <p className="py-2">
              I am a student assistant researcher at the{' '}
              <a href="https://visualdata.wustl.edu/" target="_blank" rel="noreferrer" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">VIBE Lab (Visual Interface & Behavior Exploration Lab)</a>
              . My current research includes topics on visualization, human-computer interaction, and visualization literacy.</p>
            <p className="py-2">
              I also have experience as an undergraduate student assistant researcher at the{' '}
              <a href="https://mizzoumotioncenter.com/" target="_blank" rel="noreferrer" className="underline decoration-1 hover:text-lightgold">MAC (Motion Analysis Center)</a>
              . This research included developing the software for the{' '}
              <a href="https://mizzoumotioncenter.com/technologies.html" target="_blank" rel="noreferrer" className="text-navy text-xl font-sans underline decoration-1 hover:text-lightgold">Mizzou Point-of-Care Assessment System (MPASS)</a>
              .
            </p>
            <p className="py-2">
              My professional experience comes from my internship at{' '}
              <a href="https://www.garmin.com/en-US/" target="_blank" rel="noreferrer" className="text-naby text-xl font-sans underline decoration-1 hover:text-lightgold">Garmin International, Inc.</a>
              {' '}located in Olathe, Kansas. I worked as a software engineer intern and worked to develop embedded software on smartwatches.
            </p>
            <p className="py-2">
              Outside of my research and education, I like to spend my free time taking ballet lessons at my local dance studio, writing stories, and playing video games with my friends.
            </p>
          </article>
        </div>
        <button
        className="justify-center items-center flex animate-bounce mt-10 rounded-full text-navy text-xl hover:bg-lightgold hover:opacity-100 transition-all duration-300 size-10 py-4"
        onClick={() => scrollToRef(skillsRef)}
        >
          &#8595;
        </button>
      </section>

      {/* Skills Page */}
      <section
        ref={skillsRef}
        className="min-h-screen max-w-[1440px] justify-self-center items-center flex p-10 my-8 py-24 flex-col">
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
          <button
          className="justify-center items-center flex animate-bounce mt-10 rounded-full text-navy text-xl hover:bg-lightgold hover:opacity-100 transition-all duration-300 size-10 py-4"
          onClick={() => scrollToRef(projectsRef)}
        >
          &#8595;
        </button>
      </section>

      {/* Projects Page */}
      <section
        ref={projectsRef}
        className="min-h-screen max-w-[1440px] justify-self-center justify-start items-center p-10 my-8 py-24 flex flex-col">
          <p className="text-7xl font-serif text-navy font-bold flex w-full h-full justify-start self-start">Projects</p>
          <ProjectTabs />
          <button
          className="justify-center items-center flex animate-bounce mt-10 rounded-full text-navy text-xl hover:bg-lightgold hover:opacity-100 transition-all duration-300 size-10 py-4"
          onClick={() => scrollToRef(contactRef)}
        >
          &#8595;
        </button>
      </section>

      {/* Contact Page */}
      <section
        ref={contactRef}
        className="min-h-screen max-w-[1440px] justify-self-center items-center flex p-10 my-8 py-24 flex-col">
          <p className="text-7xl font-serif text-navy font-bold flex w-full justify-start">Let's get in touch!</p>
          <div className="w-full flex flex-col items-center p-8 bg-white rounded-xl shadow-xl my-8">
            <p className="text-navy text-3xl font-serif flex justify-self-start self-start w-full">Contact me:</p>
            <div className="flex w-full justify-around items-center p-4 pt-8 flex-wrap gap-4">

              <div className="motion-safe:animate-float rounded-full h-[150px] w-[150px] flex">
                <a
                  className="h-[150px] w-[150px] bg-white shadow-xl rounded-full p-2 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                  href="https://www.linkedin.com/in/olivia-guess" target="_blank" rel="noreferrer"
                >
                  <div className="flex flex-col gap-2 w-full h-full border-2 border-lightgold rounded-full p-2 justify-center items-center">
                    <p className="text-navy text-xl font-sans">LinkedIn</p>
                    <img src={process.env.PUBLIC_URL + '/icons/Linkedin-13.svg'} alt="LinkedIn" className="h-[50px] w-[50px]" />
                  </div>
                </a>
              </div>

              <div className="motion-safe:animate-float rounded-full h-[150px] w-[150px] flex">
                <a
                  className="h-[150px] w-[150px] bg-white shadow-xl rounded-full p-2 hover:scale-110 transition-all duration-300"
                  aria-label="GitHub Profile"
                  href="https://github.com/OGuess10" target="_blank" rel="noreferrer"
                >
                  <div className="flex flex-col gap-2 w-full h-full border-2 border-lightgold rounded-full p-2 justify-center items-center">
                    <p className="text-navy text-xl font-sans">GitHub</p>
                    <img src={process.env.PUBLIC_URL + '/icons/Github-22.svg'} alt="GitHub" className="h-[50px] w-[50px]" />
                  </div>
                </a>
              </div>

              <div className="motion-safe:animate-float rounded-full h-[150px] w-[150px] flex">
                <a
                  className="h-[150px] w-[150px] bg-white shadow-xl rounded-full p-2 hover:scale-110 transition-all duration-300"
                  aria-label="Resume"
                  href={process.env.PUBLIC_URL + '/OliviaGuessResume.pdf'} target="_blank" rel="noreferrer"
                >
                  <div className="flex flex-col gap-2 w-full h-full border-2 border-lightgold rounded-full p-2 justify-center items-center">
                    <p className="text-navy text-xl font-sans">Resume</p>
                    <img src={process.env.PUBLIC_URL + '/icons/File-earmark-text-01.svg'} alt="Resume" className="h-[50px] w-[50px]" />
                  </div>
                </a>
              </div>

              <div className="motion-safe:animate-float rounded-full h-[150px] w-[150px] flex">
                <a
                  className="h-[150px] w-[150px] bg-white shadow-xl rounded-full p-2 hover:scale-110 transition-all duration-300"
                  aria-label="Email Address"
                  href="mailto:guesso.olivia@gmail.com" target="_blank" rel="noreferrer"
                >
                  <div className="flex flex-col gap-2 w-full h-full border-2 border-lightgold rounded-full p-2 justify-center items-center">
                    <p className="text-navy text-xl font-sans">Email</p>
                    <img src={process.env.PUBLIC_URL + '/icons/Paper-plane-11.svg'} alt="Email" className="h-[50px] w-[50px]" />
                  </div>
                </a>
              </div>

            </div>
          </div>
      </section>

    </div>
  );
}

export default App;
