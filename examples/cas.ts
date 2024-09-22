import * as alise from "../src";

void async function main () {
  // helper function to know what URL to use
  // to authenticate with a CAS.
  const url = await alise.urlAuthCAS(alise.KnownCAS.RhoneAlpes);
  // if awlise doesn't have your CAS, please open an issue.
  // in the meantime, you can still use it by passing a string
  // to the function, like so:
  // const url = await alise.urlAuthCAS("my_cas_name");
  console.log("You should now authenticate using", url);

  // authenticate somehow to the CAS with the given URL
  // then proceed to get a ticket from it.
  const ticket = "https://webparent.paiementdp.com/cas/aliAuthentCAS_unknown.php?ticket=ST-SOMENUMBER-ID-PROD-SKOID";

  // now that you have a ticket, you can
  // transform it into auhtentication information.
  const auth = await alise.tokenFromTicketCAS(ticket);

  // now you have a permanent token and the site ID
  // for your establishment, you can proceed to login.
  const session = await alise.loginToken(auth.siteID, auth.token);

  // you're now authenticated with the session !
  // you can now use the session to make further requests.
  console.log("You're authenticated with the session", session.id);
}();
