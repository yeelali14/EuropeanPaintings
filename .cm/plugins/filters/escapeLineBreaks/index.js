module.exports = (desc) => {
  if (desc && desc !== '""' && desc !== "''") {
    console.log("yeela-debug desc: ", desc);
    const linesTest = desc.split(/\n/);
    const lines = desc.split(/\\n/);
    console.log("yeela-debug split with one backslash", {
      linesTest,
      count: linesTest.length,
    });
    console.log("yeela-debug split with two backslash", {
      lines,
      count: lines.length,
    });
    return linesTest;
  }

  return null;
};
