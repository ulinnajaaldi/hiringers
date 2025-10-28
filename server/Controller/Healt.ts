import { Hono } from "hono";

const healtController = new Hono().get("/", (c) =>
  c.json({ message: "Hello World" }),
);

export default healtController;
