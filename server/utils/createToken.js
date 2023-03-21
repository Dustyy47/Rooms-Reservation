import jwt from "jsonwebtoken";

export const createToken = (id, isAdmin) => {
  return jwt.sign(
    {
      userId: id,
      isAdmin,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
};
