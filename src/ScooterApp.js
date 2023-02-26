const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      "Station 1": [],
      "Station 2": [],
      "Station 3": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered.");
    } else if (age < 18) {
      throw new Error("User is too young to register.");
    } else {
      const newUser = new User(username, password, age);
      this.registeredUsers[username] = newUser;
      console.log(`User has been registered`);
      return newUser;
    }
  }

  loginUser(username, password) {
    const alreadyRegistered = this.registeredUsers[username];
    if (alreadyRegistered) {
      alreadyRegistered.login(password);
      console.log(`User has been logged in!`);
      return alreadyRegistered;
    } else {
      throw new Error(`Username or password is incorrect.`);
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (user) {
      user.logout();
      console.log(`User is logged out.`);
      return user;
    } else {
      throw new Error(`No such user is logged in.`);
    }
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error(`No such station exists.`);
    }
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);
    console.log(`Created new scooter!`);
    return newScooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station exists.");
    }
    for (let station in this.stations) {
      if (Object.values(this.stations[station]).includes(scooter)) {
        throw new Error(`Scooter already at station.`);
      }
    }
    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log(`Scooter is docked.`);
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error(`Scooter already rented.`);
    }
    for (let station in this.stations) {
      const index = this.stations[station].indexOf(scooter);
      this.stations[station].splice(index, 1);
      break;
    }
    scooter.rent(user);
    console.log(`Scooter is rented!`);
  }

  // print() {
  //   console.log(`Registered Users: ${this.registeredUsers}`);
  //   for (let station in this.stations) {
  //     console.log(`Station: ${station}`);
  //     console.log(
  //       `Number of Scooters: ${Object.values(this.stations[station]).length}`
  //     );
  //   }
  // }
}

// let newScoot = new ScooterApp()
// newScoot.print();

module.exports = ScooterApp;
