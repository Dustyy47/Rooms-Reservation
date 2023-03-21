import jwt from "jsonwebtoken";

class AuthChecker {
  tryAuth = (req, res, next) => {
    try {
      const token = (req.headers.authorization || "").split(" ")[1];
      if (!token) {
        res.status(401).json("Необходимо авторизироваться!");
        next();
        return;
      }
      const payload = jwt.verify(token, process.env.SECRET);
      req.userId = payload.userId;
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  };

  checkAdmin = async (req, res, next) => {
    try {
      const token = (req.headers.authorization || "").split(" ")[1];
      if (!token) {
        res.status(401).json("Необходимо авторизироваться!");
        return;
      }
      const payload = jwt.verify(token, process.env.SECRET);
      if (!payload.isAdmin) {
        res.status(401).json("Необходимо авторизироваться!");
        return;
      }
      req.userId = payload.userId;
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  };
}

export default new AuthChecker();
