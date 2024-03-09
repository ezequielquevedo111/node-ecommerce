// import users from "../../data/fs/user.Fs.Manager.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";
import isQueryFilter from "../../utils/isQueryFilter.js";
import CustomRouter from "../CustomRouter.js";

// Endpoints - Users //

export default class UsersRouter extends CustomRouter {
  init() {
    //CREATE USER WITH POST//
    this.create("/", ["PUBLIC"], propsUsers, async (req, res, next) => {
      try {
        const dataUser = req.body;
        const response = await users.create(dataUser);
        return res.success201(response);
        // .json({
        //   statusCode: 201,
        //   response,
        // });
      } catch (error) {
        return next(error);
      }
    });

    //GET ALL USERS//
    this.read("/", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        //FILTRADO DINAMICO DEPENDIENDO LA PROPIEDAD//
        let orderBy = req.query.orderBy;
        console.log(orderBy);
        let filter = req.query.filter;
        const allUsers = await users.read({ filter, orderBy });

        return res.success200(allUsers);
        // .json({
        //   statusCode: 200,
        //   response: allUsers,
        // });
      } catch (error) {
        return next(error);
      }
    });

    //GET USER BY ID//
    this.read("/:uid", ["ADMIN", "PREM", "USER"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const oneUser = await users.readOne(uid);
        return res.success200(oneUser);
        // .json({
        //   statusCode: 200,
        //   response: oneUser,
        // });
      } catch (error) {
        return next(error);
      }
    });

    //GET USER BY EMAIL//
    this.read(
      "/:uid/:email",
      ["ADMIN", "PREM", "USER"],
      async (req, res, next) => {
        try {
          const { email, oid } = req.params;
          const oneUser = await users.readByEmail(email, oid);
          return res.success200(oneUser);
          // .json({
          //   statusCode: 200,
          //   response: oneUser,
          // });
        } catch (error) {
          return next(error);
        }
      }
    );

    //UPDATE USER //

    //REALIZAR METODO APARTE//
    this.update("/:uid", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const oneUser = await users.update(uid, data);
        return res.success200(oneUser);
        // return res.json({
        //   statusCode: 200,
        //   response: oneUser,
        // });
      } catch (error) {
        return next(error);
      }
    });

    //DELETE USER//
    this.destroy("/:uid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const oneUser = await users.destroy(uid);
        return res.success200(oneUser);
        // return res.json({
        //   statusCode: 200,
        //   response: oneUser,
        // });
      } catch (error) {
        return next(error);
      }
    });
  }
}
