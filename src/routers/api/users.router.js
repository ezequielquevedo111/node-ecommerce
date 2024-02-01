import { Router } from "express";
// import users from "../../data/fs/user.Fs.Manager.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";
import isQueryFilter from "../../utils/isQueryFilter.js";
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
    //FILTRADO DINAMICO DEPENDIENDO LA PROPIEDAD//
    let orderBy = req.query.orderBy;
    console.log(orderBy);
    const { filter, order } = isQueryFilter(req, orderBy);
    const allUsers = await users.read({ filter, order });
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

//GET USER BY EMAIL//
usersRouter.get("/:uid/:email", async (req, res, next) => {
  try {
    const { email, oid } = req.params;
    const oneUser = await users.readByEmail(email, oid);
    return res.json({
      statusCode: 200,
      response: oneUser,
    });
  } catch (error) {
    return next(error);
  }
});

//UPDATE USER //

//REALIZAR METODO APARTE//
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

//DELETE USER//
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const oneUser = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response: oneUser,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
