import { useEffect } from 'react';

import LangHelper from '@/helpers/langHelper';
import GtagHelper from '@/helpers/gtagHelper';

const usePageViewEvent = pageName => {
    useEffect(() => {
        const title = `LAP - ${LangHelper.getSingleResource('Report')} - ${LangHelper.getSingleResource(pageName)}`;
        document.title = title;

        GtagHelper.logPageView(title);
    }, [pageName]);
};

export default usePageViewEvent;
