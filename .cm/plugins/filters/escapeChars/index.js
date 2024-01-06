module.exports = (pr) => {
  console.log("yeela-debug pr description:", pr.description);
  console.log("yeela-debug pr description type:", typeof pr.description);
  console.log(
    "yeela-debug pr description stringify:",
    JSON.stringify({
      description: pr.description,
      value: typeof pr.description,
    })
  );
  return JSON.stringify({
    description: pr.description,
    value: typeof pr.description,
  });
};
