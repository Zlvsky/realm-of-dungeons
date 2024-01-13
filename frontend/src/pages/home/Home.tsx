import BasicWrapper from "../../components/layouts/page-wrappers/BasicWrapper";
import Header from "../../components/common/text/Header";
import homeBg from "../../assets/images/homeBG.png";
import logo from "../../assets/logo.png";
import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";
import Button from "../../components/common/button/Button";
import ImageWithText from "../../components/layouts/sections/ImageWithText";
import Characters1 from "../../assets/images/characters1.png"
import SectionDivider from "../../components/common/dividers/SectionDivider";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../../components/footer/Footer";
import Features from "./components/Features";

const homeBackground = {
  backgroundImage: `url(${homeBg}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundBlendMode: "multiply"
};

function Home() {
  const user = Cookies.get("jwt");
  return (
    <FullWrapper>
      <div className="relative w-full max-h-[550px]" style={homeBackground}>
        <BasicWrapper>
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-5 text-center pb-12 pt-24">
              <img src={logo} alt="" width={630} />
              <Header>Begin your adventure, explore the realms</Header>
              <h3 className="text-xl md:text-2xl font-semibold font-sans bg-gradient-to-b from-accent to-primaryLight text-transparent bg-clip-text">
                OPEN ALPHA: JAN 10, 2024 - MAR 31, 2024
              </h3>
              <div className="flex justify-center mb-4">
                {Boolean(user) ? (
                  <Link to="/start">
                    <Button>CHARACTERS</Button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <Button>PLAY NOW</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </BasicWrapper>
      </div>
      <SectionDivider />
      <ImageWithText header="Create your hero and explore" image={Characters1}>
        <p className="text-secondary font-semibold font-sans text-lg">
          Realm of Dungeons is a fantasy multiplayer role-playing game based on
          idle system. <br />
          Create your own hero, explore realms by finishing quests. Defeat
          dungeon bossess, level up to become stronger. Train your skill
          abilities, collect gold and gear up.
        </p>
      </ImageWithText>

      <Features />

      <Footer />
    </FullWrapper>
  );
}

export default Home;
