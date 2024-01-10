import { Router } from "express";
import users from "../../data/fs/user.Fs.Manager.js";
import propsUsers from "../../middlewares/propsUsers.js";
const usersRouter = Router();

// Endpoints - Users //

//CREATE USER WITH POST//
usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const dataUser = req.body;
    const response = await users.create(dataUser);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

//GET ALL USERS//
usersRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await users.read();
    return res.json({
      statusCode: 200,
      response: allUsers,
    });
  } catch (error) {
    return next(error);
  }
});

//GET USER BY ID//
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: oneUser,
    });
  } catch (error) {
    return next(error);
  }
});

//UPDATE USER//
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const oneUser = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: oneUser,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
