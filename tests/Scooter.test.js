const Scooter = require("../src/Scooter");

describe("Scooter", () => {
  let scooter;
  beforeEach(() => {
    scooter = new Scooter("Station A");
  });

  test("constructor initializes properties correctly", () => {
    expect(scooter.station).toBe("Station A");
    expect(scooter.user).toBeNull();
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  // rent method
  test("renting a scooter updates its properties correctly", () => {
    scooter.name = "Nathan";
    scooter.rent("Nathan");
    expect(scooter.station).toBeNull();
    expect(scooter.user).toBe("Nathan");
  });

  test("renting a scooter with low charge throws an error", () => {
    scooter.name = "Nathan";
    scooter.charge = 10;
    expect(() => {
      scooter.rent("Nathan");
    }).toThrowError(`Scooter ${scooter.serial} needs to charge.`);
  });

  test("renting a broken scooter throws an error", () => {
    scooter.name = "Nathan";
    scooter.isBroken = true;
    expect(() => {
      scooter.rent("Nathan");
    }).toThrowError(`Scooter ${scooter.serial} needs repair.`);
  });

  // dock method
  test("docking a scooter updates its properties correctly", () => {
    scooter.name = "Nathan";
    scooter.rent("Nathan");
    scooter.dock("Station B");
    expect(scooter.station).toBe("Station B");
    expect(scooter.user).toBeNull();
  });

  // requestRepair method
  test("repairing a scooter updates isBroken", () => {
    scooter.isBroken = true;
    jest.useFakeTimers();
    scooter.requestRepair();
    jest.runAllTimers();
    expect(scooter.isBroken).toBe(false);
    jest.useRealTimers();
  });

  test("should let user know that scooter isn't broken", () => {
    scooter.isBroken = false;
    expect(scooter.requestRepair()).toBe(
      `Scooter ${scooter.serial} is working!`
    );
  });

  // charge method
  test("charging scooter should charge correctly", () => {
    scooter.charge = 50;
    jest.useFakeTimers();
    scooter.recharge();
    jest.advanceTimersByTime(2000);
    expect(scooter.charge).toBe(60);
    jest.advanceTimersByTime(8000);
    expect(scooter.charge).toBe(100);
    jest.useRealTimers();
  });

  test("trying to charge a fully charged scooter should tell user its charged", () => {
    scooter.name = "Nathan";
    scooter.charge = 100;
    expect(scooter.recharge()).toBe(
      `Scooter ${scooter.serial} has finished charging!`
    );
  });
});
