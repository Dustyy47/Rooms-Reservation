import jwt from "jsonwebtoken";

export const createToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
};
