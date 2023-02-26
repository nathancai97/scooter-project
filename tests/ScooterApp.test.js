const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here
describe("ScooterApp", () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
  });

  describe("registerUser function", () => {
    test("registering new user should create new user with correct properties", () => {
      const newUser = scooterApp.registerUser("Nathan", "password123", 25);
      expect(newUser).toBeInstanceOf(User);
      expect(newUser.username).toBe("Nathan");
    });

    test("should throw an error if user is already in registeredUsers object", () => {
      scooterApp.registerUser("Nathan", "password123", 25);
      expect(() => {
        scooterApp.registerUser("Nathan", "password124", 25);
      }).toThrow(`User already registered.`);
    });

    test("should throw an error if user is too young", () => {
      expect(() => {
        scooterApp.registerUser("youngNathan", "password123", 17);
      }).toThrow(`User is too young to register.`);
    });
  });

  describe("loginUser function", () => {
    beforeEach(() => {
      scooterApp.registerUser("Nathan", "password123", 25);
    });

    test("logging in works as intended", () => {
      const user = scooterApp.loginUser("Nathan", "password123");
      expect(user.username).toBe("Nathan");
      expect(user.loggedIn).toBe(true);
    });

    test("should throw an error if wrong username and/or pass", () => {
      expect(() => {
        scooterApp.loginUser("notNathan", "password124");
      }).toThrow(`Username or password is incorrect.`);
    });
  });

  describe("logoutUser function", () => {
    beforeEach(() => {
      scooterApp.registerUser("Nathan", "password123", 25);
      scooterApp.loginUser("Nathan", "password123");
    });

    test("should log out the user", () => {
      const user = scooterApp.logoutUser("Nathan");
      expect(user.loggedIn).toBe(false);
    });

    test("should throw an error if user isn't logged in", () => {
      expect(() => {
        scooterApp.logoutUser("notNathan");
      }).toThrow("No such user is logged in.");
    });
  });

  describe("createScooter function", () => {
    test("should create new scooter and adds it to station", () => {
      scooterApp.createScooter("Station 1");
      expect(scooterApp.stations["Station 1"].length).toEqual(1);
    });

    test("should throw an error if station doesn't exist", () => {
      expect(() => {
        scooterApp.createScooter("Station A");
      }).toThrow("No such station exists.");
    });
  });

  describe("dockScooter function", () => {
    test("should dock the scooter to the station", () => {
      const scooter = new Scooter("Station 1");
      scooterApp.dockScooter(scooter, "Station 1");
      expect(scooterApp.stations["Station 1"]).toContain(scooter);
    });

    test("should throw an error when docking to a station that doesn't exist", () => {
      const scooter = new Scooter();
      expect(() => scooterApp.dockScooter(scooter, "Station A")).toThrow(
        "No such station"
      );
    });

    test("should throw an error if trying to dock a scooter that is already docked in the station", () => {
      const scooter = new Scooter("Station 1");
      scooterApp.stations["Station 1"].push(scooter);
      expect(() => {
        scooterApp.dockScooter(scooter, "Station 1");
      }).toThrow("Scooter already at station.");
    });
  });

  describe("rentScooter function", () => {
    test("should successfully rent scooter to user", () => {
      const scooter = new Scooter("Station 1");
      const user = new User("Nathan", "password123", 25);
      const listOfScooters = scooterApp.stations["Station 1"];
      listOfScooters.push(scooter);
      scooterApp.rentScooter(scooter, user);
      expect(listOfScooters).not.toContain(scooter);
      expect(scooter.station).toBe(null);
      expect(scooter.user).toBe(user);
    });

    test("should throw an error when trying to rent a scooter that is already rented by someone else", () => {
      const scooter = new Scooter("Station 1");
      const nate = new User("Nathan", "password123", 25);
      const kevin = new User("Kevin", "password321", 23);
      const scooterList = scooterApp.stations["Station 1"];

      scooterList.push(scooter);
      scooter.rent(nate);

      expect(() => scooterApp.rentScooter(scooter, kevin)).toThrow(
        "Scooter already rented"
      );
    });
  });
});
