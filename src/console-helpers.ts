
const LIST_COMMAND = () => (
  'git ls-files -v'
);

const LIST_ITEM_FILTER = (line:string) => {
  const matcher = new RegExp(`h (.*)`); // i.e. h lib/rules/changed-file.js
  const breakdown = line.match(matcher);
  return breakdown && breakdown[1];
};

const STOP_TRACKING_COMMAND = (filePath:string) => (
  `git update-index --assume-unchanged ${filePath}`
);

const RESTORE_TRACKING_COMMAND = (filePath:string) => (
  `git update-index --no-assume-unchanged ${filePath}`
);

export {
  LIST_COMMAND,
  LIST_ITEM_FILTER,
  STOP_TRACKING_COMMAND,
  RESTORE_TRACKING_COMMAND,
};
