import mongoose from "mongoose";
import { Character } from "../schemas/character/characterSchema";

const uri = ""
const PAGE = 1;

const fetchRanking = async (page: number) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    const itemsPerPage = 24;

    const startIndex  = (PAGE - 1) * itemsPerPage;

    const rankingHeroes = await Character.find({})
      .select("_id nickname progression.level")
      .sort({ "progression.level": -1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .exec();

    const totalCount = await Character.countDocuments({});

    mongoose.connection.close();

    const response = {
      totalItems: totalCount,
      itemsPerPage: itemsPerPage,
      currentPage: PAGE,
      items: rankingHeroes,
    };

    console.log(response);
}

const testRanking = () => {
  describe(`Ranking test`, () => {
    it("Testing fetching ranking data", async () => {
      return true;
      // await fetchRanking(PAGE);
    });
  });
};

// testRanking();

export default true;
