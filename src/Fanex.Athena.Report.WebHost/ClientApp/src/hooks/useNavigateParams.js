import { createSearchParams, useNavigate } from 'react-router-dom/dist';

const useNavigateParams = () => {
    const navigate = useNavigate();

    return (url, params) => {
        if (!params) {
            return navigate(url);
        }

        return navigate({
            pathname: url,
            search: createSearchParams(params).toString(),
        });
    };
};

export default useNavigateParams;
