class Scooter {
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = 1;
    this.nextSerial = 1;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge >= 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
    } else if (this.charge < 20) {
      throw new Error(`Scooter needs to charge.`);
    } else {
      throw new Error(`Scooter needs repair.`);
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  recharge() {
    if (this.charge < 100) {
      console.log(`Scooter is charging...`);
      setInterval(() => {
        if (this.charge < 100) {
          this.charge += 10;
          console.log(`Scooter battery percentage at ${this.charge}...`);
        } else {
          console.log(`Scooter has finished charging!`);
        }
      }, 2000);
    }
  }

  requestRepair() {
    if (!this.isBroken) {
      return `Scooter is working!`;
    }

    console.log(`Scooter repair has been requested.`);
    setTimeout(() => {
      console.log(`Scooter ${this.serial} repair completed!`);
    }, 5000);
    this.isBroken = false;
  }
}

module.exports = Scooter;