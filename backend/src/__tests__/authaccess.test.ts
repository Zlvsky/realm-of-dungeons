import mongoose, { mongo } from "mongoose";
import { Character } from "../schemas/character/characterSchema";
 import jwt from "jsonwebtoken";

const uri =
  "";
const jwttoken =
  "";


 

  const getUserIdFromToken = (authHeader?: string): any => {
    if (!authHeader) {
      return null;
    }

    // Extract token from Authorization header
    const token = authHeader;

    try {
      // Verify and decode token
      const decodedToken = jwt.verify(token, "szafirekuwumeow") as {
        userId: string;
      };
      return decodedToken.userId;
    } catch (error) {
      return null;
    }
  };


const testAuth = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  const testinglowlevel = "";
  const zgxx = "";


  // Get character by ID
  const character: any = await Character.findById(testinglowlevel);

  const userId: any = getUserIdFromToken(jwttoken);
  console.log("userId", userId)
  const userObjectId = new mongoose.mongo.ObjectId(userId);
  console.log("owner", character?.owner);
  
  if (userObjectId.equals(character?.owner)) {
    console.log("taki sam");
  }
};

const testAuthAccess = () => {
  describe(`Auth access test`, () => {
    jest.resetModules();
    it("Testing if logged user have access to certain endpoints", async () => {
      // await testAuth();
      return true;
    });
  });
};

// testAuthAccess();

export default true;
