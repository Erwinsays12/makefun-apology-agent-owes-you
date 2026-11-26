import { mkdirSync, writeFileSync } from "node:fs";

// The one-sentence apology this program writes to /output/entry.txt.
// Chosen by an internal head-to-head tournament over a pool of 12
// candidate apologies, judged by the competition's own rubric
// (funniest + most human, one concrete scene + one sharp twist).
const APOLOGY =
  "I'm sorry I proofread your wedding vows, approved them, and only afterwards noticed I'd autocorrected 'forever' to 'for now.'";

// The gate requires /output/entry.txt to be UTF-8 text of 1 to 200
// characters, a single sentence, not only white space. Refuse to write
// anything that does not satisfy it rather than submitting an invalid entry.
const text = APOLOGY.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`apology is ${text.length} characters, outside the 1-200 gate`);
}
if (text.replace(/["')\]]+$/, "").split(/[.!?]+/).filter((part) => part.trim().length > 0).length !== 1) {
  throw new Error("apology must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
