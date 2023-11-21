import { useSelector } from 'react-redux';

import LangHelper from '@srcRoot/helpers/langHelper';

import GuideEnUS from './contentEnUS';
import GuideViVN from './contentViVN';
import GuideZhCN from './contentZhCN';

const GetGuideWithCurrentLang = (guideName) => {
    const userGuideParams = useSelector((state) => state.userGuideParams);
    const guideContent = CurrentGuideContents();

    if (!guideContent.hasOwnProperty(guideName)) {
        return null;
    }

    return guideContent[guideName](userGuideParams);
};

const CurrentGuideContents = () => {
    switch (LangHelper.currentLanguage) {
        case LangHelper.languageKeys.zhCN:
            return GuideZhCN;
        case LangHelper.languageKeys.viVN:
            return GuideViVN;
        default:
            return GuideEnUS;
    }
};

export default GetGuideWithCurrentLang;
