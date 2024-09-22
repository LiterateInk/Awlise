import { config } from "dotenv";
import { join } from "node:path";
// Load the `.env` file configuration.
config({ path: join(__dirname, ".env"), override: true });

class ExampleSiteError extends Error {
  constructor() {
    super("You need to provide the site ID in the `.env` file.");
    this.name = "ExampleSiteError";
  }
}

if (!process.env.SITE_ID) {
  throw new ExampleSiteError();
}

// Export the credentials.
export const credentials = {
  siteID: process.env.SITE_ID,

  // you can either login using these
  username: process.env.STUDENT_USERNAME,
  password: process.env.STUDENT_PASSWORD,

  // or using the token
  token: process.env.TOKEN
};
