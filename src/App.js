import './App.css';
import { useRef } from "react";

function App() {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const linkedinRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>

      {/* Header */}
        <div className="fixed top-5 mx-10 items-center border-cream border-2 rounded-full grid grid-cols-3 z-30 bg-navy">
          <div className="mx-2 my-2 w-full h-full items-center flex">
            <button
              className="px-5 bg-gold rounded-full text-navy font-bold text-5xl hover:bg-cream transition-all duration-300"
              onClick={() => scrollToRef(homeRef)}>OG</button>
          </div>
          <div className="flex justify-center">
            <button
              className="text-cream text-lg px-10 hover:bg-cream hover:text-navy py-2 mx-2 rounded-full transition-all duration-300"
              onClick={() => scrollToRef(homeRef)}>HOME</button>
            <button
              className="text-cream text-lg px-10 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300"
              onClick={() => scrollToRef(aboutRef)}>ABOUT</button>
            <button className="text-cream text-lg px-10 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300">RESUME</button>
            <button className="text-cream text-lg px-10 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300">LINKEDIN</button>
            <button className="text-cream text-lg px-10 mx-2 hover:bg-cream hover:text-navy py-2 rounded-full transition-all duration-300">CONTACT</button>
          </div>
          <div></div>
        </div>

      {/* Home Page */}
      <section
        ref={homeRef}
        className="w-screen h-screen m-0 justify-center items-center flex flex-col pt-20">

        {/* Body */}
        <div className="h-full w-5/6 flex justify-center items-center p-10 flex space-x-[-50px]">
          
          {/* Card 1 */}
          <div className="relative h-full w-1/3 bg-cream shadow-xl rounded-full p-5 flex items-center justify-center transition-all duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-10">
              <p className="text-navy text-lg">Currently seeking full-time, remote positions in:</p>
              <ul className="text-navy text-m list-disc">
                <li>Software Engineering</li>
                <li>Frontend Development</li>
                <li>Human-Computer Interaction</li>
                <li>Visualization</li>
              </ul>
              <p className="text-navy text-lg">Computer Science Master's Student at Washington University in St. Louis</p>
              <p className="text-navy text-lg">Bachelor of Science--Computer Science--University of Missouri 2024</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative z-10 h-full w-1/3 bg-gold rounded-full shadow-xl p-5 flex items-center justify-center text-center transition-all duration-300 hover:z-20 hover:scale-110 hover:bg-cream hover:border-gold group">
            <div className="h-full w-full rounded-full border-cream border-2 items-center justify-center flex p-10 transition-all duration-300 group-hover:border-gold">
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
                <p className="text-navy text-9xl tracking-wide mb-8">
                  Olivia Guess
                </p>
                <p className="text-navy text-5xl">&#9826;</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-full w-1/3 bg-cream shadow-lg rounded-full p-5 flex items-center justify-center transition-all duration-300 hover:z-20 hover:scale-110">
            <div className="h-full w-full rounded-full border-gold border-2 items-center justify-center flex flex-col p-5">
              <div className="bg-[url('/public/professional-photo.jpg')] bg-cover bg-center h-full w-full rounded-full"></div>
            </div>
          </div>

        </div>

      </section>

      {/* About Page */}
      <section
        ref={aboutRef}
        className="w-screen h-screen justify-center items-center flex flex-col p-10">
      </section>

    </div>
  );
}

export default App;
