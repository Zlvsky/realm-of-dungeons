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
            <div className="flex flex-col gap-5 text-center pb-12 pt-32">
              <img src={logo} alt="" width={630} />
              <Header>Begin your adventure, enter the dungeon</Header>
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
      <ImageWithText image={Characters1}>
        <Header>Create your hero and explore</Header>
        <p className="text-secondary font-semibold font-sans">
          In this idle MMO game, players explore challenging dungeons, level up
          their characters, and acquire powerful gear. With minimal active
          gameplay required, it's perfect for those seeking a relaxing but
          rewarding gaming experience.
        </p>
      </ImageWithText>
      <Footer />
    </FullWrapper>
  );
}

export default Home;
