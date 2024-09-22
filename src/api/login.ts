import { defaultFetcher, type Fetcher, getCookiesFromResponse } from "@literate.ink/utilities";
import { Request } from "~/core/request";
import type { Session } from "~/models";

export const loginCredentials = async (siteID: string, username: string, password: string, fetcher: Fetcher = defaultFetcher): Promise<Session> => {
  const request = new Request(`aliAuthentification.php?site=${siteID}`);
  request.setFormData(
    `txtLogin=${encodeURIComponent(username)}&txtMdp=${encodeURIComponent(password)}`
      // apparently keeps the session open ?
      + "&chkKeepSession=1"
  );

  const response = await request.send(fetcher);

  // TODO: check if the login was successful ?
  // we need someone with credentials login to check/implement for us
  throw new Error("unimplemented");
};

export const loginToken = async (siteID: string, token: string, fetcher: Fetcher = defaultFetcher): Promise<Session> => {
  const request = new Request(`aliAuthentification.php?site=${siteID}&token=${token}`);
  const response = await request.send(fetcher);

  const cookies = getCookiesFromResponse(response).filter((cookie) => cookie.startsWith("PHPSESSID="));
  const sessionID = cookies.at(-1)?.split("=")[1];

  if (!sessionID) {
    throw new Error("No session ID found");
  }

  // will redirect to aliIndexClient.php but we do not really care at this point.
  // NOTE: do we need those cookies ?
  // - v_aes=3.8.70.5
  // - v_wp=13
  // - valid_rgpd=0

  return {
    id: sessionID,
    siteID,
    fetcher
  };
};
