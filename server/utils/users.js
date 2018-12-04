var users = [];

//addUser (id,name,room)

//removeUser(id)

//getUser

//getUSerList

class Users {
  constructor() {
    this.users = [];
  }

  addUSer(id, name, room) {
    var user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => {
        return user.id != id;
      });
    }
    return user;
  }

  getUser(id) {
    var user = this.users.filter((user) => {
      return user.id === id;
    })[0];
    return user;
  }

  getUserCountByName(name,room){
    console.log('fonksiyona girdi');
    console.log(this.users);
    var user = this.users.filter((user)=>{
      return user.name==name && user.room==room;
    });
    console.log(`Users from getusercount func ${user}`);
    return user.length;
  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {
  Users
};
