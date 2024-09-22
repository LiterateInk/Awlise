import type { Fetcher } from "@literate.ink/utilities";

export type Session = Readonly<{
  /**
   * Content of PHPSESSID cookie.
   */
  id: string
  /**
   * Identifier of the site for your establishment.
   */
  siteID: string

  fetcher: Fetcher
}>;
