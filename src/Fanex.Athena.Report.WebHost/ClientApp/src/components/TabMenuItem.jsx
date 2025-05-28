import React from 'react';

export const TabMenuItem = (props) => {
    const { item, isActive, onClickTabMenu } = props;

    return (
        <li key={item.key}>
            <a className={isActive ? 'active' : ''} onClick={() => onClickTabMenu(item.key)}>
                {item.title}
                {item.isNew && <><span>&nbsp;</span>
                    <i className="icon-new" title="New" style={{ position: 'absolute' }} ></i>
                </>}
            </a>
        </li>
    )
}

export default React.memo(TabMenuItem);