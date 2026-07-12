import { describe, it } from "node:test";
import { use } from "chai";

globalThis.describe = describe;
globalThis.it = it;

use((await import("chai-as-promised")).default); // eslint-disable-line unicorn/no-await-expression-member
