import { USER_GUIDE_PARAMS } from "./types";

export const setUserGuideParams = (data) => {
  return {
    type: USER_GUIDE_PARAMS,
    data: data,
  };
};
