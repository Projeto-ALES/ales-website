const { separateByDays } = require("../separateByDays");

describe("separateByDays test", () => {
  it("has a module", () => {
    expect(separateByDays).toBeDefined();
  });

  it("receives an empty list", async () => {
    expect(await separateByDays([])).toEqual({});
  });

  it("has start.dateTime", async () => {
    const today = new Date();

    const events = [
      {
        start: {
          dateTime: today,
        },
      },
      {
        start: {
          dateTime: today,
        },
      }
    ];
    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    const result = {};
    result[date] = [...events];
    expect(await separateByDays(events)).toMatchObject(result);
  });

  it("has start.date", async () => {
    const today = new Date();
    const date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    const events = [
      {
        summary: "Event 1",
        start: {
          date,
        },
      },
      {
        summary: "Event 2",
        start: {
          date,
        },
      }
    ];
    let result = {};
    result[date] = [...events];
    expect(await separateByDays(events)).toMatchObject(result);
  });
});