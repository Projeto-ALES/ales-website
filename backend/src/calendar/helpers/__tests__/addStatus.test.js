const { addStatus } = require("../addStatus");
const { processStatus } = require("../processStatus");

describe("addStatus test", () => {
  it("has a module", () => {
    expect(addStatus).toBeDefined();
  });

  it("has an empty list of events", async () => {
    let events = [];
    expect(await addStatus(events)).toEqual([]);
  });

  it("has events with no attendees", async () => {
    let events = [
      {
        summary: "Event 1"
      },
      {
        summary: "Event 2"
      },
    ];
    let result = [
      {
        summary: "Event 1",
        processStatus: processStatus.EMPTY,
      },
      {
        summary: "Event 2",
        processStatus: processStatus.EMPTY,
      },
    ]
    expect(await addStatus(events)).toEqual(result);
  });

  it("has events with attendees but no confirmation", async () => {
    let events = [
      {
        summary: "Event 1",
        attendees: [{ email: "foo@bar", responseStatus: "needsAction" }],
      },
      {
        summary: "Event 2",
      },
    ];
    let result = [
      {
        summary: "Event 1",
        attendees: [{ email: "foo@bar", responseStatus: "needsAction" }],
        processStatus: processStatus.PENDING,
      },
      {
        summary: "Event 2",
        processStatus: processStatus.EMPTY,
      },
    ]
    expect(await addStatus(events)).toEqual(result);
  });

  it("has events with attendees and their confirmation", async () => {
    let events = [
      {
        summary: "Event 1",
        attendees: [{ email: "foo@bar", responseStatus: "confirmed" }],
      },
      {
        summary: "Event 2",
      },
    ];
    let result = [
      {
        summary: "Event 1",
        attendees: [{ email: "foo@bar", responseStatus: "confirmed" }],
        processStatus: processStatus.CONFIRMED,
      },
      {
        summary: "Event 2",
        processStatus: processStatus.EMPTY,
      },
    ]
    expect(await addStatus(events)).toEqual(result);
  });
});