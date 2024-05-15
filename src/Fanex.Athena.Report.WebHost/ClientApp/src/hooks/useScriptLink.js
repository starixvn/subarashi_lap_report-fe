import { useCallback } from 'react';

const useScriptLink = () => {
    const body = document.body;

    const append = useCallback((scriptLink, id) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptLink;

        if (id) {
            script.id = id;
        }

        body.appendChild(script);

        return script;
    }, []);

    const remove = useCallback((script) => {
        body.removeChild(script);
    }, []);

    return { append, remove };
};

export default useScriptLink;
