function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [20, 40, 25, 50, 10, 60];
      break;
    default:
      res = null;
      break;
  }
  return res;
}

module.exports = chart;
