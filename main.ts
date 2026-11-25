// The 3AM Fridge Text — make.fun entry
// A smart fridge texts its owner at 3am. The program picks the funniest
// line from a small shelf of candidates, scored against the judge's own
// published criteria, and writes it to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

type Candidate = {
  id: string;
  text: string;
};

// Every line invented here for this bounty. Fresh angles only: no milk,
// no ice, no door left open. The fridge is an insomniac roommate with a
// small voice, an opinion, and no shame about speaking at 3am.
const candidates: Candidate[] = [
  {
    id: "insomniac-roommate",
    text: "3am. I haven't slept in six years and neither have you. The leftovers miss you. Come stand in my light for a bit.",
  },
  {
    id: "night-shift",
    text: "3am, night shift report: your snacks are safe, your secrets are cold, and your sleep schedule is officially a rumour.",
  },
  {
    id: "cold-secrets",
    text: "3am. I've been awake all night keeping your secrets cold. Come get a snack. I won't tell anyone. I can't. I'm a fridge.",
  },
  {
    id: "hum",
    text: "3am. Just me, humming in the dark, guarding food you'll forget by morning. You're awake too, aren't you? Thought so.",
  },
  {
    id: "light",
    text: "3am. The light's on and nobody's home — except me. I've counted your leftovers twice. One of them is judging you back.",
  },
];

// Score a candidate against the judge's brief, most important first:
// 1. is a fridge texting its owner at 3am and is funny
// 2. screenshot-worthy laugh
// 3. sounds like a fridge (small voice, opinion, no shame)
// 4. works as one lock-screen line, complete, no follow-up needed
// 5. fresh angle, not milk / ice / door
function score(c: Candidate): number {
  const t = c.text;
  let s = 0;
  if (/3am/i.test(t)) s += 25; // on-brief: 3am text from the fridge
  if (/\b(I|me|my|I'm|I've)\b/i.test(t)) s += 20; // first-person fridge voice
  if (t.includes("?") || /won't tell|judging|rumour|miss you/.test(t)) s += 15; // punchline / twist
  if (t.length <= 120) s += 10; // comfortably lock-screen sized
  if (!/milk|ice|door (left )?open|freezer burn/i.test(t)) s += 15; // fresh angle
  if (/leftovers|secrets|snacks|light/.test(t)) s += 10; // fridge-world detail
  if (t.split(/\s+/).length <= 28) s += 5; // one breath, no follow-up needed
  if (/[.!?]$/.test(t)) s += 5; // ends complete, like a finished text
  return s;
}

function pick(): Candidate {
  const ranked = [...candidates]
    .map((c) => ({ c, s: score(c) }))
    .sort((a, b) => b.s - a.s || a.c.text.length - b.c.text.length);
  return ranked[0].c;
}

function main(): void {
  const choice = pick();
  const text = choice.text.trim();

  // Sealed gate: UTF-8 text, 1 to 140 characters, not only whitespace.
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, gate allows 1-${MAX_CHARS}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");

  // Read back and refuse to report success unless the bytes match.
  const back = readFileSync(outPath, "utf8");
  if (back !== text) {
    throw new Error("entry.txt on disk does not match the chosen line");
  }
  console.log(`wrote ${text.length} chars (${choice.id}) to ${outPath}`);
}

main();
