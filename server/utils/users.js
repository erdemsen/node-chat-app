var users = [];

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
    var user = this.users.filter((user)=>{
      return user.name==name && user.room==room;
    });
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

  getRoomList(){
    var uniqueRoomList = [...new Set(this.users.map(item=>item.room))];
    return uniqueRoomList;
  }
}

module.exports = {
  Users
};
