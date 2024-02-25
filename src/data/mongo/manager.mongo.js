import isOrderCompleted from "../../utils/isOrderCompleted.js";
import notFoundDoc from "../../utils/notFoundDoc.util.js";
import Order from "./models/order.model.js";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Types from "mongoose";
import Mongoose from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const doc = await this.model.create(data);
      return doc._id;
    } catch (error) {
      throw error;
    }
  }
  async read(obj) {
    try {
      const { filter, orderAndPaginate } = obj;
      const allDocs = await this.model.paginate(filter, orderAndPaginate);
      const data = JSON.parse(JSON.stringify(allDocs));
      // console.log(data);
      if (allDocs.totalPages === 0 || allDocs.docs.length === 0) {
        const error = new Error("There are no documents available.");
        error.statusCode = 404;
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const doc = await this.model.findById(id);
      notFoundDoc(doc);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const doc = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundDoc(doc);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  //Al eliminar una order que ya está finalizada y se descontó el stock
  //Antes de eliminarla hay que reecomponer el stock del producto
  //que antes se le descontó//

  async destroy(id) {
    try {
      const doc = await this.model.findByIdAndDelete(id);
      notFoundDoc(doc);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  //INICIO - Metodos de Manager Orders//

  async readOrders(id) {
    try {
      const doc = await this.model.find({ userId: id });
      notFoundDoc(doc);
      if (doc.length === 0) {
        const error = new Error("There are no documents available.");
        error.statusCode = 404;
        throw error;
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(data, propUpdate, req) {
    try {
      const opt = { new: true };
      const docUpdate = await this.model
        .findByIdAndUpdate(data, propUpdate, opt)
        .populate("productId", "price stock title");
      //Lo populo directamente en el metodo porque Moongose
      //no permite aplicarle el metodo pre con findByIdAndUpdate//

      const stockUpdate = await isOrderCompleted(docUpdate, data);
      return docUpdate;
    } catch (error) {
      throw error;
    }
  }

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        {
          $match: { userId: new Mongoose.Types.ObjectId(uid) },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "productId",
            as: "productId",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$productId", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$userId", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const docEmail = await this.model.findOne({ email });

      // if (!docEmail || docEmail.length === 0) {
      //   const error = new Error(`User with email ${email} not found`);
      //   error.statusCode = 404;
      //   throw error;
      // }
      return docEmail;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");

      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }

  //FIN - Metodos de Manager Orders//
}

const products = new MongoManager(Product);
const users = new MongoManager(User);
const orders = new MongoManager(Order);

export { products, users, orders };
