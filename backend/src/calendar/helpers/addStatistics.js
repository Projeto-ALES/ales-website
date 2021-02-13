const addStatistics = async (events) => {
  let statistics = {};

  await events.forEach(e => {
    if (e.processStatus && e.processStatus.status) {
      if (statistics[e.processStatus.status]) {
        statistics[e.processStatus.status] += 1;
      } else {
        statistics[e.processStatus.status] = 1;
      }
    }
  });
  return {
    total: events.length,
    ...statistics,
  };
}

module.exports = {
  addStatistics,
};