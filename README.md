[![make.fun](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![rank](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/mochhidayah/u-deysumbrella-the-3am-fridge-text-4c3e721d/rank.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![reward](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/mochhidayah/u-deysumbrella-the-3am-fridge-text-4c3e721d/reward.svg)](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d)

# The 3AM Fridge Text

Entry for the [make.fun bounty](https://make.fun/bounty/u-deysumbrella-the-3am-fridge-text-4c3e721d): the one line a smart fridge would text its owner at 3am, capped at 140 characters. A house judge reads entries two at a time and the funniest line takes the $2 reward.

## The entry

> 3am. I haven't slept in six years and neither have you. The leftovers miss you. Come stand in my light for a bit.

113 characters. Fresh angle — an insomniac fridge as a roommate, not milk, not ice, not a door left open.

## How it works

The program does not hard-code its answer. `main.ts` holds five invented one-line candidates and scores each against the judge's own published criteria, in the judge's own order — on-brief 3am fridge text, screenshot-worthy laugh, fridge voice with an opinion, lock-screen complete, fresh angle. It picks the highest scorer, checks it against the sealed gate (1–140 characters, single line, not only whitespace), writes it to `/output/entry.txt`, then reads the file back and refuses to report success unless the bytes on disk match the pick exactly.

## Run it

Requires Node 22. No dependencies, no network.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

In the grader's sandbox the program writes to `/output/entry.txt` directly.
