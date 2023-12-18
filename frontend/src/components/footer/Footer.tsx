import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import coffee from "../../assets/images/icons/other/coffee.png";
import SectionDivider from "../common/dividers/SectionDivider";

function Footer() {
    const year = new Date().getFullYear();

    return (
      <div className="flex flex-col items-center justify-center w-full bg-black/50">
        <SectionDivider />
        <div className="flex flex-col items-center justify-center py-12">
          <img src={logo} alt="Dungeon Realms" width={350} />
          <div className="flex flex-row gap-1 font-sans mt-6">
            <Link
              to="/"
              className="uppercase transition-colors text-grey1 hover:text-primary px-2 border-r last:border-0 border-grey1/30"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="uppercase transition-colors text-grey1 hover:text-primary px-2 border-r last:border-0 border-grey1/30"
            >
              SignIn
            </Link>
            <Link
              to="/signin"
              className="uppercase transition-colors text-grey1 hover:text-primary px-2 border-r last:border-0 border-grey1/30"
            >
              Characters
            </Link>
          </div>
          <a
            href="https://www.buymeacoffee.com/dungeonrealms"
            target="_blank"
            className="font-sans text-white flex flex-row items-center text-xl border border-grey1 rounded-sm px-2 py-1 bg-[#292621] mt-6"
          >
            <img src={coffee} width={40} /> <span>Buy me a coffee</span>
          </a>
          <span className="text-grey1 text-sm mt-10">
            © {year} Dungeon Realms by zlvsky. All rights reserved{" "}
          </span>
        </div>
      </div>
    );
}

export default Footer;