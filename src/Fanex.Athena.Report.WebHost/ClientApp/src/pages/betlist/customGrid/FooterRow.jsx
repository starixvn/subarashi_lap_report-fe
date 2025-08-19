import React from 'react';
import { Row } from '@legion-lib/react-grid';

const FooterRow = ({ className, children, ...rest }) => (
    <Row className={`${className} light-footer`} {...rest}>
        {children}
    </Row>
);

export default React.memo(FooterRow);
