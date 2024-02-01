import isOrderCompleted from "../../utils/isOrderCompleted.js";
import notFoundDoc from "../../utils/notFoundDoc.util.js";
import Order from "./models/order.model.js";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";

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
      const { filter, order } = obj;
      const allDocs = await this.model.find(filter).sort(order);
      if (allDocs.length === 0) {
        const error = new Error("There are no documents available.");
        error.statusCode = 404;
        throw error;
      }
      return allDocs;
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
  async destroy(id) {
    try {
      const doc = await this.model.findByIdAndDelete(id);
      notFoundDoc(doc);
      return doc;
    } catch (error) {
      throw error;
    }
  }

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
      console.log(propUpdate);
      const docUpdate = await this.model.findByIdAndUpdate(
        data,
        propUpdate,
        opt
      );
      const stockUpdate = await isOrderCompleted(docUpdate, data);

      // const orderState = await isOrderCompleted(docUpdate);

      // console.log(orderState);
      console.log(stockUpdate);
      return docUpdate;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email, oid) {
    try {
      const docEmail = await this.model.find({ oid, email: email });
      if (!docEmail || docEmail.length === 0) {
        const error = new Error(`User with email ${email} not found`);
        error.statusCode = 404;
        throw error;
      }
      return docEmail;
    } catch (error) {
      throw error;
    }
  }
}

//CREAR METODO UPDATE ESPECIFICO PARA PRODUCTS Y UNO PARA ORDERS//

const products = new MongoManager(Product);
const users = new MongoManager(User);
const orders = new MongoManager(Order);

export { products, users, orders };
