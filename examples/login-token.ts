import * as alise from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const session = await alise.loginToken(credentials.siteID, credentials.token!);

  // you're now authenticated with the session !
  // you can now use the session to make further requests.
  console.log("You're authenticated with the session", session.id);
}();
