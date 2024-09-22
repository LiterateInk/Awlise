import { type Fetcher, defaultFetcher, type Request, setCookiesArrayToRequest, getHeaderFromResponse } from "@literate.ink/utilities";
import type { AuthenticationInformation } from "~/models";

/**
 * @param url Ticket URL to handle.
 *
 * @example
 * const ticket = "https://webparent.paiementdp.com/cas/aliAuthentCAS_unknown.php?ticket=ST-SOMENUMBER-ID-PROD-SKOID";
 * const auth = await alise.tokenFromTicketCAS(ticket);
 */
export const tokenFromTicketCAS = async (url: string, fetcher: Fetcher = defaultFetcher): Promise<AuthenticationInformation> => {
  const [root, ticket] = url.split("?");
  const cookie = ticket.replace("ticket=", "PHPSESSID=");

  const request = {
    url: new URL(root),
    redirect: "manual"
  } satisfies Request;

  setCookiesArrayToRequest(request, [cookie]);

  const response = await fetcher(request);
  const rawAuthURL = getHeaderFromResponse(response, "location");

  if (!rawAuthURL) {
    throw new Error("No location header found");
  }

  const authURL = new URL(rawAuthURL);

  return {
    siteID: authURL.searchParams.get("site")!,
    token: authURL.searchParams.get("token")!
  };
};
