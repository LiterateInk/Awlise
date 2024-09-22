import { defaultFetcher, type Fetcher, getHeaderFromResponse } from "@literate.ink/utilities";

import type { CAS } from "~/models";
import { KnownCAS } from "./known-cas";
import { Request } from "~/core/request";

/**
 * Get the URL to use to perform CAS authentication.
 */
export const urlAuthCAS = async (cas: KnownCAS | CAS | string, fetcher: Fetcher = defaultFetcher): Promise<string> => {
  const id = typeof cas === "string" ? cas : cas.id;
  const request = new Request(`cas/aliAuthentCAS_${id}.php`);
  const response = await request.send(fetcher);

  const location = getHeaderFromResponse(response, "location");
  if (!location) {
    throw new Error("No location header found");
  }

  // Would look something like for SupportedCAS.RhoneAlpes:
  // https://cas.ent.auvergnerhonealpes.fr/login?service={url_but_encoded}
  return location;
};
