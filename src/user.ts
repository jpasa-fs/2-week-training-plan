type Guest = {
  id: number;
  name: string;
  age: number;
  type: "GUEST";
};

type Registered = {
  id: number;
  name: string;
  age: number;
  type: "REGISTERED";
};

export type User = Guest | Registered;
