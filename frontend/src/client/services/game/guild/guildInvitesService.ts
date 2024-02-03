import getRequest from "../../../requests/getRequest";

export const guildInvitesService = async () => {
  const result = await getRequest({
    url: `/guild/hero/${localStorage.getItem("hero")}/invites`,
  });
  return result;
};
