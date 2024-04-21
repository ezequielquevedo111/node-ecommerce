//VALORES INICIALES//
import fs from "fs";
import crypto from "crypto";
import notFoundDoc from "../../utils/notFoundDoc.util.js";
// import { createHash } from "../../utils/hash.utils.js";

const settings = "utf-8";

//CLASE CON METODOS//
class UserManager {
  static #users = [];
  constructor(path) {
    this.path = path;
    this.isExist();
  }

  //METODO PARA VALIDAR SI EXISTE EL ARCHIVO O NO//
  isExist() {
    const exist = fs.existsSync(this.path, settings);
    if (exist) {
      const readContent = fs.readFileSync(this.path, settings);
      UserManager.#users = JSON.parse(readContent);
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  //METODO CREADOR CON VALIDACIONES//
  async create(data) {
    try {
      UserManager.#users.push(data);
      const dataUser = JSON.stringify(UserManager.#users, null, 2);
      await fs.promises.writeFile(this.path, dataUser);
      return data;
    } catch (error) {
      throw error;
    }
  }

  //METODO PARA LEER TODOS LOS ARCHIVOS CON VALIDACIONES//
  async read(obj) {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      let users = JSON.parse(data);

      const { filter = {}, sort } = obj;

      if (filter && filter.email) {
        users = users.filter((user) => user.email === filter.email);
      }

      if (sort) {
        users.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (sort === "asc") {
            return nameA.localeCompare(nameB);
          } else if (sort === "desc") {
            return nameB.localeCompare(nameA);
          }
        });
      }

      if (!data || users.length === 0) {
        const error = new Error("There are no documents available.");
        error.statusCode = 404;
        throw error;
      }

      return users;
    } catch (error) {
      error.statusCode = 404;
      throw error;
    }
  }

  //METODO PARA LEER UN ARCHIVO POR ID CON VALIDACIONES//
  async readOne(id) {
    try {
      const res = await fs.promises.readFile(this.path, "utf8");
      const doc = JSON.parse(res);
      const user = doc.find((user) => user._id === id);
      notFoundDoc(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  //METODO PARA ELIMINAR POR ID//
  async destroy(id) {
    try {
      const oneUser = await this.readOne(id);
      // const oneUser = UserManager.#users.find((user) => user.id === id);
      if (oneUser) {
        UserManager.#users = UserManager.#users.filter(
          (user) => user._id !== id
        );

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );

        return oneUser;
      }
    } catch (error) {
      throw error;
    }
  }

  // async update(id, data) {
  //   try {
  //     const oneUser = await this.readOne(id);
  //     if (
  //       !oneUser ||
  //       !(
  //         data.hasOwnProperty("name") ||
  //         data.hasOwnProperty("photo") ||
  //         data.hasOwnProperty("email")
  //       )
  //     ) {
  //       throw new Error(
  //         `There isn't a user with ID: ${id} or there isn't exist a property named as name, photo or email`
  //       );
  //     } else {
  //       for (const prop in data) {
  //         switch (prop) {
  //           case "name":
  //             oneUser.name = data.name;
  //             break;
  //           case "photo":
  //             oneUser.photo = data.photo;
  //             break;
  //           case "email":
  //             oneUser.email = data.email;
  //             break;
  //         }
  //       }
  //       await fs.promises.writeFile(
  //         this.path,
  //         JSON.stringify(UserManager.#users, null, 2)
  //       );
  //     }
  //     return oneUser;
  //   } catch (error) {
  //     error.statusCode = 404;
  //     throw error;
  //   }
  // }

  async update(id, data) {
    try {
      const doc = await this.readOne(id);
      notFoundDoc(doc);

      for (let each in data) {
        doc[each] = data[each];
      }
      const index = UserManager.#users.findIndex((user) => user._id === id);
      if (index !== -1) {
        UserManager.#users[index] = doc;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#users, null, 2)
      );

      return doc;
    } catch (error) {
      throw error;
    }
  }

  readByEmail(email) {
    try {
      return (
        UserManager.#users.find((user) => user.email.toLowerCase() === email) ||
        null
      );
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

const users = new UserManager("./src/data/fs/files/users.Fs.json");

export default users;

//Comentado el update porque cuando inicias nodemon se crea un loop porque ejecuta la siguiente linea//
// users.update("9bced94e5f95b7984981d737", { name: "lionel messi" });
