module.exports = (desc) => {
  if (desc && desc !== '""' && desc !== "''") {
    console.log("yeela-debug pr.description: ", pr.description);
    // seems that the description has extra layer of escape charecters
    const lines = desc.split(/\n|\\n/);
    // The loop finds the table header and then looks for the 2nd line
    // so the guard checks for i + 2 < lines
    for (let i = 0; i + 2 < lines.length; i++) {
      const currentLine = lines[i];
      if (
        /SEVERITY.*DIRECT DEPENDENCIES.*IMPACTED DEPENDENCY.*FIXED VERSIONS.*CVES/.exec(
          currentLine
        )
      ) {
        const nextLine = lines[i + 2];
        const cells = nextLine.split("|");
        const [_a, from] = /:v([\d\.]+[A-Za-zαß]*)/.exec(cells[3]);
        const [_b, to] = /([\d\.]+[A-Za-zαß]*)/.exec(cells[4]);
        return [to, from];
      }
    }
  }

  return null;
};
