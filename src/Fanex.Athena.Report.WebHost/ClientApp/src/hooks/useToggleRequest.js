import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@srcRoot/actions/loaderAction";
import LangHelper from "@srcRoot/helpers/langHelper";

const useToggleRequest = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback((requestFunc, callbackFunc) => {
    dispatch(toggleLoader(true));
    requestFunc()
      .then((response) => {
        dispatch(toggleLoader(false));
        callbackFunc(response);
      })
      .catch((error) => {
        alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
        dispatch(toggleLoader(false));
      });
  }, []);

  return { sendRequest };
};

export default useToggleRequest;
