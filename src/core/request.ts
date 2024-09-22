import { type Request as FetcherRequest, setHeaderToRequest, type Response, type Fetcher, setCookiesArrayToRequest } from "@literate.ink/utilities";
import type { Session } from "~/models";

export class Request {
  private readonly request: FetcherRequest;

  public constructor (path: string) {
    this.request = {
      url: new URL("https://webparent.paiementdp.com/" + path),
      redirect: "manual"
    };
  }

  public setFormData (data: string): void {
    this.request.method = "POST";
    this.request.content = data;
    setHeaderToRequest(this.request, "Content-Type", "application/x-www-form-urlencoded");
  }

  public setSession (session: Session): void {
    setCookiesArrayToRequest(this.request, [`PHPSESSID=${session.id}`]);
  }

  public send (fetcher: Fetcher): Promise<Response> {
    return fetcher(this.request);
  }
}
