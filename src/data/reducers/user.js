import * as constants from "../constants/user";
const userReducer = (user = null, action) => {
  const { type, data } = action;
  switch (type) {
    case constants.FETCH_USER:
    case constants.UPDATE_USER:
    case constants.CONNECT_MONO:
      return { ...user, ...data };
    case constants.FETCH_USER_APPLICATIONS:
      user.applications = data;
      return user;
    case constants.DELETE_APPLICATION:
      const newUser = { ...user };
      const newApplications = user.applications.filter(
        (app) => app.id !== data.id
      );
      newUser.applications = newApplications;
      return newUser;
    default:
      return user;
  }
};

export default userReducer;
