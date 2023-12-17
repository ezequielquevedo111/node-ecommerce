class UserManager {
  static #users = [];
  //METODO CREADOR//
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
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
console.log(user.readOne(2));
