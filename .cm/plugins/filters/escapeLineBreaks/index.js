module.exports = (desc) => {
  if (desc && desc !== '""' && desc !== "''") {
    console.log("yeela-debug desc: ", desc);
    const linesTest = desc.split(/\n/); 
    const lines = desc.split(/\n|\\n/);
    console.log('yeela-debug split with one backslash', linesTest);
    console.log('yeela-debug split with two backslash', lines);
    return linesTest;
  }

  return null;
};
