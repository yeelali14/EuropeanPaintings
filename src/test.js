const allAuthors =
  "author Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor yeelali14\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor EladKohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor EladKohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela\nauthor-mail <yeela@gitatechnologies.com>\nauthor Yeela Lifshitz\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor Yeela Lifshitz\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Yeela Lifshitz\nauthor-mail <52451294+yeelali14@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Elad Kohavi\nauthor-mail <106978846+EladKohavi@users.noreply.github.com>\nauthor Yeela Lifshitz\nauthor-mail <yeelalifshitz@MacBook-Pro-8.local>\nauthor Yeela Lifshitz\nauthor-mail <yeelalifshitz@MacBook-Pro-8.local>\n";

const getAuthorLines = (
  allAuthors,
  author,
  file,
  branch,
  isDryRun,
  payload
) => {
  try {
    console.log("yeela-debug, getAuthorLines - author: ", author);
    const { owner, repo, pullRequestNumber } = payload;
    const authorFormatted =
      `author ${author?.substring(0, author.indexOf("<") - 1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}` +
      "\\n" +
      `author-mail ${author
        ?.substring(author.indexOf("<"), author.indexOf(">") + 1)
        .replace("+", "\\+")}`;

    console.log(`authorFormatted: ${authorFormatted}`);

    // const extraData = { authorFormatted, gitCommand, allAuthors };
    // handleLogsInContributersStat(
    //   isDryRun,
    //   `get author lines for pr ${owner}/${repo}/${pullRequestNumber}`,
    //   payload,
    //   extraData
    // );
    const regex = new RegExp(authorFormatted, "g");
    console.log(
      `getAuthorLines result for author: ${author}`,
      (allAuthors.match(regex) || []).length
    );
    return (allAuthors.match(regex) || []).length;
  } catch (error) {
    console.log(`error getting author lines in file: ${error}`);
    return "0";
  }
};

[
  "Yeela <yeela@gitatechnologies.com>",
  "yeelali14 <52451294+yeelali14@users.noreply.github.com>",
  "EladKohavi <106978846+EladKohavi@users.noreply.github.com>",
  "Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>",
  "Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>",
  "Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>",
].forEach((author) => {
  console.log(
    "FINAL: ",
    getAuthorLines(allAuthors, author, "README.md", "main", false, "")
  );
});



// "README.md": {
//     "Yeela <yeela@gitatechnologies.com>": 33,
//     "yeelali14 <52451294+yeelali14@users.noreply.github.com>": 18,
//     "EladKohavi <106978846+EladKohavi@users.noreply.github.com>": 6,
//     "Elad Kohavi <106978846+EladKohavi@users.noreply.github.com>": 27,
//     "Yeela Lifshitz <52451294+yeelali14@users.noreply.github.com>": 9,
//     "Yeela Lifshitz <yeelalifshitz@MacBook-Pro-8.local>": 6
//   }