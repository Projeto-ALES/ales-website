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
          dateTime: today.toISOString(),
        },
      },
      {
        start: {
          dateTime: today.toISOString(),
        },
      }
    ];

    const date = ("0" + today.getDate()).slice(-2) + "/" + ("0" + (today.getMonth() + 1)).slice(-2) + "/" + today.getFullYear();
    const result = {};
    result[date] = [...events];

    expect(await separateByDays(events)).toMatchObject(result);
  });

  it("has start.date", async () => {
    const today = "2000-02-01";
    const events = [
      {
        summary: "Event 1",
        start: {
          date: today,
        },
      },
      {
        summary: "Event 2",
        start: {
          date: today,
        },
      }
    ];
    let result = {};
    result["01/02/2000"] = [...events];
    expect(await separateByDays(events)).toMatchObject(result);
  });
});