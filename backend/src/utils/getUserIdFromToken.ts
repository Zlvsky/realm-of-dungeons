import jwt from "jsonwebtoken";

const getUserIdFromToken = (authHeader?: string): any => {
  if (!authHeader) {
    return null;
  }

  // Extract token from Authorization header
  const token = authHeader;

  try {
    // Verify and decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    return decodedToken.userId;
  } catch (error) {
    return null;
  }
};

export default getUserIdFromToken;
