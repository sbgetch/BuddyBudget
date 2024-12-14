//assets
import heroImage from "../assets/hero_image.png";

const About = () => {
  return (
    <section id="about" className="bg-slate-200">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-8 text-center xl:px-24">
          <h2 className="text-2xl font-bold text-slate-600 text-center transition-transform hover:scale-105 hover:text-lime-800">
            "Live within your means, but plan for your dreams."
          </h2>
          <p className="text-lg font-semibold border border-slate-800 shadow shadow-slate-950 p-4 rounded-xl text-lime-800">
            BuddyBudget is a buddy for personal finance that makes budgeting
            easier. BuddyBudget may help you take charge of your finances
            whether you're trying to save for a major purchase, organize a trip,
            or are just trying to keep things under control.
          </p>
        </div>
        <img className="w-full h-96" src={heroImage} alt="" />
      </div>
    </section>
  );
};

export default About;
