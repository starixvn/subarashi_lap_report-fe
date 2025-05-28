import React from 'react';

const ActionCell = ({ isEdited = false, onEditClick, onSaveClick, onCloseClick }) => {
    const buttonStyle = {
        padding: '0 8px',
        height: '24px',
        lineHeight: '24px',
        marginRight: '8px',
        minWidth: '0',
    };

    const iconEditStyle = {
        fontSize: '14px',
        lineHeight: '24px',
        color: '#cc0000',
    };

    const iconSaveStyle = {
        fontSize: '14px',
        lineHeight: '24px',
        color: '#cc0000',
    };

    const iconCloseStyle = {
        fontSize: '14px',
        lineHeight: '24px',
        color: '#cc0000',
    };

    return (
        <>
            {!isEdited ? (
                <button type="button" className="waves-effect waves-light btn" onClick={onEditClick} style={buttonStyle}>
                    <i className="icon-edit" style={iconEditStyle}></i>
                </button>
            ) : (
                <button type="button" className="waves-effect waves-light btn" onClick={onSaveClick} style={buttonStyle}>
                    <i className="icon-save" style={iconSaveStyle}></i>
                </button>
            )}
            <button type="button" className="waves-effect waves-light btn" onClick={onCloseClick} style={buttonStyle}>
                <i className="icon-close" style={iconCloseStyle}></i>
            </button>
        </>
    );
};

export default ActionCell;
