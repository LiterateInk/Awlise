import { Request } from "~/core/request";
import type { Session } from "~/models";

export const home = async (session: Session): Promise<string> => {
  const request = new Request("aliIndexClient.php");
  request.setSession(session);

  const response = await request.send(session.fetcher);
  return response.content;
};
