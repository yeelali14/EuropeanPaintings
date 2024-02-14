module.exports = (text) => {
  console.log("hello from plugin:", text);
  return JSON.stringify({ my_key: "ok", property1: "not ok" });
};
