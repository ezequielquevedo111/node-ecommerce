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
    if (allUsers.length === 0) {
      return res.json({
        statusCode: 404,
        response: "not found",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allUsers,
      });
    }
  } catch (error) {
    return next(error);
  }
});

//GET USER BY ID//
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    if (
      oneUser.length === 0 ||
      oneUser === "No matches were found with the entered ID"
    ) {
      return res.json({
        statusCode: 404,
        response: oneUser,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneUser,
      });
    }
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
    if (
      oneUser ===
      `There isn't a user with ID: ${uid} or there isn't exist a property named as name, photo or email`
    ) {
      return res.json({
        statusCode: 404,
        response: oneUser,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneUser,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
