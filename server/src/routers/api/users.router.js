import { Router } from "express";
import users from "../../data/fs/user.Fs.Manager.js";
const usersRouter = Router();

// Endpoints - Users //

//CREATE USER WITH POST//
usersRouter.post("/", async (req, res) => {
  try {
    const dataUser = req.body;
    const response = await users.create(dataUser);
    if (
      response ===
      "The values of name, photo, email, price and stock are required and must be of type string."
    ) {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//GET ALL USERS//
usersRouter.get("/", async (req, res) => {
  try {
    const allUsers = await users.read();
    if (allUsers.length === 0) {
      return res.json({
        statusCode: 404,
        message: "not found",
      });
    } else {
      return res.json({
        statusCode: 200,
        response: allUsers,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//GET USER BY ID//
usersRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.readOne(uid);
    if (
      oneUser.length === 0 ||
      oneUser === "No matches were found with the entered ID"
    ) {
      return res.json({
        statusCode: 404,
        message: oneUser,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneUser,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 505,
      message: error.message,
    });
  }
});

//UPDATE USER//
usersRouter.put("/:uid", async (req, res) => {
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
        message: oneUser,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: oneUser,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 505,
      message: error.message,
    });
  }
});

export default usersRouter;
