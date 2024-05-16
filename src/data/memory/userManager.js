import crypto from "crypto";
import winston from "../../utils/logger/winston.utils.js";

class UserManager {
  static #users = [];
  //METODO CREADOR//
  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    UserManager.#users.push(user);
    return user;
  }
  //METODO PARA LEER TODO//

  read(options = {}) {
    let filteredUsers = [...UserManager.#users];

    if (options.filter && options.filter.email) {
      filteredUsers = filteredUsers.filter(
        (user) => user.email === options.filter.email
      );
    }

    if (options.sort && options.sort === "asc") {
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (options.sort && options.sort === "desc") {
      filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      return UserManager.#users;
    }

    return filteredUsers;
  }
  //METODO PARA LEER  POR ID//

  readOne(id) {
    return UserManager.#users.find((user) => user.id === id);
  }

  //METODO PARA ELIMINAR POR ID//
  destroy(id) {
    try {
      const oneUser = UserManager.#users.find((user) => user.id === id);
      if (!oneUser) {
        throw new Error("There isn't a user with ID: " + id);
      } else {
        UserManager.#users = UserManager.#users.filter(
          (user) => user.id !== oneUser.id
        );
        winston.INFO("Deleted user with ID: " + oneUser.id);
      }
    } catch (error) {
      winston.WARN(error.message);
      return error.message;
    }
  }

  //METODO PARA ACTUALIZAR POR ID//
  update(id, data) {
    try {
      const oneUser = UserManager.#users.find((user) => user.id === id);
      if (
        !oneUser ||
        !(
          data.hasOwnProperty("name") ||
          data.hasOwnProperty("photo") ||
          data.hasOwnProperty("email")
        )
      ) {
        throw new Error(
          `There isn't a user with ID: ${id} or there isn't exist a property named as name, photo or email`
        );
      } else {
        for (const prop in data) {
          switch (prop) {
            case "name":
              oneUser.name = data.name;
              break;
            case "photo":
              oneUser.photo = data.photo;
              break;
            case "email":
              oneUser.email = data.email;
              break;
          }
        }
      }
      return oneUser;
    } catch (error) {
      winston.WARN(error.message);
      return error.message;
    }
  }
  readByEmail(email) {
    return UserManager.#users.filter((user) => user.email === email);
  }
}

const user = new UserManager();

const user1 = user.create({
  name: "Sergio",
  photo: "/desktop/images/bulldog.png",
  email: "sergio23@gmail.com",
});

const user2 = user.create({
  name: "Mario",
  photo: "/desktop/images/bulldog.png",
  email: "mario@gmail.com",
});

winston.INFO(
  user.read({
    sort: "desc",
  })
);
