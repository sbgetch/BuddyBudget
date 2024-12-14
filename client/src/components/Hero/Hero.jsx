//libraries
import { Link } from "react-router-dom";

//module
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={`${styles.backgroundImage} pt-4 h-96 lg:h-svh`}>
      <div className="flex flex-col items-center justify-center h-full pb-4 gap-2 lg:gap-8">
        <h1>BudgetBuddy</h1>
        <h3>Your best buddy for budgeting!</h3>
        <Link className="registerBtn h-10 w-48 lg:h-14 lg:w-60" to="/register">
          Registration
        </Link>
      </div>
    </section>
  );
};

export default Hero;
