import React, { useEffect } from "react";
import useToggleRequest from "@srcRoot/hooks/useToggleRequest";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "../actions/index";
import LangHelper from "@srcRoot/helpers/langHelper";
import CollapsiblePanel from "@srcRoot/components/CollapsiblePanel";
import UserGuide from "@srcRoot/components/UserGuide";
import DataService from '@srcRoot/lib/dataService';

const FormFilter = (props) => {
  const dispatch = useDispatch();
  const userGuideContent = useSelector((state) => state.userGuideContent);
  const { getUserGuideContent, setGridData } = ActionCreators;
  const { sendRequest } = useToggleRequest();

  useEffect(() => {
    sendRequest(() => DataService.getReportData('SettledMatchCount/Index'), _updateData);
  }, []);

  const _updateData = (result) => {
    if (result && result.data !== null) {
      dispatch(setGridData(result.data));
      return;
    }
    dispatch(setGridData(null));
  }

  const SupportButton = (
    <UserGuide
      title={LangHelper.getSingleResource("UserGuide")}
      contentTitle={LangHelper.getSingleResource("SettledMatchCount")}
      onClick={() => dispatch(getUserGuideContent("SettledMatchCount", true))}
      content={userGuideContent}
    />
  );

  return (
    <CollapsiblePanel className="page-filter" stickyFooter={SupportButton} isCollapseMode={false} />
  );
};

export default React.memo(FormFilter);
