import crypto from "crypto";

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
  }
  //METODO PARA LEER TODO//

  read() {
    return UserManager.#users;
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
        console.log("Deleted user with ID: " + oneUser.id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const user = new UserManager();

user.create({
  name: "Sergio",
  photo: "/desktop/images/bulldog.png",
  email: "sergio23@gmail.com",
});

user.create({
  name: "Mario",
  photo: "/desktop/images/dog.png",
  email: "mario123@gmail.com",
});

console.log(user.read());
user.destroy("be143835f2ecf4202c74f680");
