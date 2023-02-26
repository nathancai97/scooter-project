class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge >= 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
    } else if (this.charge < 20) {
      throw new Error(`Scooter ${this.serial} needs to charge.`);
    } else {
      throw new Error(`Scooter ${this.serial} needs repair.`);
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  recharge() {
    if (this.charge < 100) {
      console.log(`Scooter ${this.serial} is charging...`);
      setInterval(() => {
        if (this.charge < 100) {
          this.charge += 10;
          console.log(
            `Scooter ${this.serial} battery percentage at ${this.charge}...`
          );
        }
      }, 2000);
    } else {
      console.log(`Scooter ${this.serial} has finished charging!`);
      return `Scooter ${this.serial} has finished charging!`;
    }
  }

  requestRepair() {
    if (!this.isBroken) {
      return `Scooter ${this.serial} is working!`;
    }

    console.log(`Scooter repair has been requested.`);
    setTimeout(() => {
      console.log(`Scooter ${this.serial} repair completed!`);
    }, 5000);
    this.isBroken = false;
  }
}

module.exports = Scooter;
