import test from "ava";
import { hasValidChars } from "./src/utils";

test("has valid chars", t => {
  const value = hasValidChars("Fredrik123", /^[a-zA-Z0-9_]*$/);
  t.is(value, true);
});

test("has invalid chars", t => {
  const value = hasValidChars("Fredrik Sundqvist", /^[a-zA-Z0-9_]*$/);
  t.is(value, false);
});
