import { useCallback } from 'react';

const useStyleSheetLink = () => {
    const head = document.head;

    const append = useCallback((stylePath) => {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = stylePath;

        head.appendChild(link);

        return link;
    }, []);

    const remove = useCallback((link) => {
        head.removeChild(link);
    }, []);

    return { append, remove };
};

export default useStyleSheetLink;
