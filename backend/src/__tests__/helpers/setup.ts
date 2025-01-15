import { beforeEach } from "vitest";
import drainDb from "./drain-db";

beforeEach(async () => {
  await drainDb();
});
