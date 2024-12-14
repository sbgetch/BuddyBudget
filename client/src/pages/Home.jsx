//libraries
import { useContext, useEffect } from "react";

//context
import { AppContext } from "../context/AppContext";

//components
import Hero from "../components/Hero/Hero";
import About from "../components/About";

const Home = () => {
  const { setIsHome } = useContext(AppContext);

  useEffect(() => {
    setIsHome((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      setIsHome((prev) => !prev);
    };
  }, []);

  return (
    <main className="flex flex-col">
      <Hero />

      <About />
    </main>
  );
};

export default Home;
