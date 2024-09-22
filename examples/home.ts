import * as alise from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const session = await alise.loginToken(credentials.siteID, credentials.token!);
  const home = await alise.home(session);
  console.log(home); // TODO: returns the HTML currently.
}();
