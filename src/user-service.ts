import type { User } from "./user.js";

export function sendGreeting(user: User): string {
  switch (user.type) {
    case "GUEST":
      return `Welcome ${user.name}! Register now to get full account features.`;
    case "REGISTERED":
      return `Welcome Back ${user.name}!`;
    default:
      const exhaustiveCheck: never = user;
      return exhaustiveCheck;
  }
}
