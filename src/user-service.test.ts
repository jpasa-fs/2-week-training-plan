import assert from "node:assert/strict";
import test from "node:test";
import { sendGreeting } from "./user-service.js";
import type { User } from "./user.js";

test("returns a welcome & registration prompt for a guest user", () => {
  const guest: User = {
    id: 1,
    name: "Ada",
    age: 30,
    type: "GUEST",
  };

  assert.equal(
    sendGreeting(guest),
    "Welcome Ada! Register now to get full account features.",
  );
});

test("returns a welcome back message for a registered user", () => {
  const registered: User = {
    id: 2,
    name: "Grace",
    age: 35,
    type: "REGISTERED",
  };

  assert.equal(sendGreeting(registered), "Welcome Back Grace!");
});