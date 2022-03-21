import { BROWSER_ID, ACCESS_TOKEN } from "../constants";
import * as constants from "../constants/application";

const applicationReducer = (application = null, action) => {
  const { type, data } = action;
  const agents = localStorage.getItem(BROWSER_ID);
  switch (type) {
    case constants.FETCH_APPLICATION:
    case constants.UPDATE_APPLICATION:
    case constants.UPLOAD_APPLICATION_FILE:
      return data;
    case constants.INITIATE_APPLICATION:
      const initiateAgents = agents ? JSON.parse(agents) : [];
      initiateAgents.push({ agent: data.agent, time: Date.now() });
      localStorage.setItem(BROWSER_ID, JSON.stringify(initiateAgents));
      const apply = { ...application };
      apply.id = data.id;
      return apply;
    case constants.CREATE_APPLICATION:
      localStorage.removeItem(BROWSER_ID);
      localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data.token));
      return null;
    default:
      return application;
  }
};

export default applicationReducer;
