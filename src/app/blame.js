import { readFileSync } from "fs";
import { execSync } from "child_process";

const gitCommands = {
  GIT_BLAME: ({ branch, file }) =>
    `git blame ${branch} --line-porcelain -- '${file}'`,
  GIT_LOG: ({ file }) => `git log -- '${file}'`,
  GIT_BLAME_AUTHORS_FORMAT: () =>
    `| grep '^author-mail\\|^author ' | sed '$!N;s/\\n/ /'`,
  GIT_BLAME_STRING: () => `| sed -n '/^author /,/^author-mail /p'`,
  COMMITER_PER_FILE: ({ file }) =>
    `git shortlog -s -n --all --no-merges '${file}'`,
  COMMITS_DATE_BY_AUTHOR: ({ branch, author }) =>
    `git log ${branch} --author='${author}' --format='%as' | sort | uniq`,
  GIT_ACTIVITY: ({ branch, file, since }) =>
    `git log --no-merges ${branch} --since='${since}' --pretty=tformat:'%an <%ae>,%ad' --numstat -- '${file}'`,
  AUTHORS_COUNT: () => `git log --format='%an <%ae>' | sort | uniq`,
  REPO_FILES_COUNT: () => `git ls-files | wc -l`,
  FIRST_COMMIT: ({ branch }) =>
    `git rev-list --max-parents=0 ${branch} --format="%cs"`,
};

const SOURCE_CODE_WORKING_DIRECTORY = "./code";

export const getAllAuthorsOfFile = (file, branch) => {
  try {
    const gitCommand = `${gitCommands.GIT_BLAME({
      file,
      branch,
    })} ${gitCommands.GIT_BLAME_AUTHORS_FORMAT()}`;
    const rawAuthors = execSync(gitCommand).toString();

    const authors = [
      ...new Set(
        rawAuthors
          ?.replaceAll("author ", "")
          .replaceAll("author-mail ", "")
          .split("\n")
      ),
    ]?.filter(Boolean);

    return authors;
  } catch (error) {
    console.log(`${file}. ${error}`);
    return [];
  }
};

const getAuthorLines = (allAuthors, author) => {
  try {
    const authorFormatted = `author ${author
      ?.substring(0, author.indexOf("<") - 1)
      ?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\nauthor-mail ${author
      ?.substring(author.indexOf("<"), author.indexOf(">") + 1)
      .replace("+", "\\+")}`;

    const regex = new RegExp(authorFormatted, "g");

    return (allAuthors.match(regex) || []).length;
  } catch (error) {
    console.log(`${file}. ${error}`);
    return "0";
  }
};

export const readRemoteFile = (file, branch) => {
  execSync(`git config --global --add safe.directory '*'`).toString();
  try {
    execSync(`git show '${branch}:${file}' > '${file}'`).toString();
    return readFileSync(`${file}`, "utf8");
  } catch (error) {
    console.log(`error reading file ${error}`);
    return "";
  }
};

const readRemoteFileAndSplit = (file, branch) =>
  readRemoteFile(file, branch)?.split(/\r\n|\r|\n/);

const isLastRowEmpty = (file, branch) => {
  const allRows = readRemoteFileAndSplit(file, branch);
  return allRows?.[allRows?.length - 1] === "" ? true : false;
};

const getCodeLinesCount = (file, branch) =>
  isLastRowEmpty(file, branch)
    ? readRemoteFileAndSplit(file, branch)?.length - 1
    : readRemoteFileAndSplit(file, branch)?.length;

const calculateStatisticsForBlame = (allAuthors, author, file, branch) => {
  const authorLines = parseInt(getAuthorLines(allAuthors, author)) || "";
  const allLinesCount = parseInt(getCodeLinesCount(file, branch));
  return { authorLines, allLinesCount };
};

const getGitBlameString = (file, branch) => {
  try {
    const gitCommand = `${gitCommands.GIT_BLAME({
      file,
      branch,
    })} ${gitCommands.GIT_BLAME_STRING()}`;
    const allAuthors = execSync(gitCommand).toString();
    return allAuthors;
  } catch (error) {
    console.log(`error: ${error.message}`);
    return "0";
  }
};

const calculateLinesPercentage = (authorLines, allLinesCount) =>
  authorLines && allLinesCount
    ? authorLines >= allLinesCount
      ? 100
      : parseFloat(authorLines / allLinesCount) * 100
    : 0;

const blameByAuthor = (files, branch) => {
  return {
    ...files.reduce((acc, file) => {
      const authors = getAllAuthorsOfFile(file, branch);
      const allAuthorsString = getGitBlameString(file, branch);
      return {
        ...acc,
        ...{
          [file]: authors.reduce((prevAuthor, author) => {
            const { authorLines, allLinesCount } = calculateStatisticsForBlame(
              allAuthorsString,
              author,
              file,
              branch
            );
            console.log({ authorLines, allLinesCount });
            return {
              ...prevAuthor,
              [author]: calculateLinesPercentage(authorLines, allLinesCount),
              dsBlame: allAuthorsString
            };
          }, {}),
        },
      };
    }, {}),
  };
};
const blames = blameByAuthor(["README.md"], "main");
const newBlames = Object.keys(blames).reduce((acc, file) => {
    // if()
    // return {
    //     ...acc, 
    //     [file]: 
    // }, {}
})
console.log(blames);
