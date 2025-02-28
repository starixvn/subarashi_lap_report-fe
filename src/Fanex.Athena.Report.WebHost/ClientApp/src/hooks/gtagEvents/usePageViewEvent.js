import React, { useEffect } from 'react';

import LangHelper from '@/helpers/langHelper';
import GtagHelper from '@/helpers/gtagHelper';

const usePageViewEvent = (id, pageName) => {
    useEffect(() => {
        const title = `LAP - ${LangHelper.getSingleResource('Report')} - ${pageName ?? LangHelper.getSingleResource(id)}`;
        document.title = title;

        GtagHelper.logPageView(title);
    }, [id]);
};

export default usePageViewEvent;
