import React from 'react';
import LangHelper from '@/helpers/langHelper';

export const predefinedIcons = {
    error: 'error',
    warning: 'warning',
    success: 'success',
};

export const defaultSubmitButton = {
    text: LangHelper.getSingleResource('Submit'),
    className: 'btn btn-apply',
};

export const defaultCancelButton = {
    text: LangHelper.getSingleResource('Cancel'),
    className: 'btn',
};

export const defaultOkButton = {
    text: LangHelper.getSingleResource('OK'),
    className: 'btn btn-apply',
};

export const generateDefaultConfirmOption = (content, onClose, submitProps, cancelProps, icon = predefinedIcons.warning, customOption = {}) => ({
    buttons: [
        { ...defaultSubmitButton, ...submitProps },
        { ...defaultCancelButton, ...cancelProps },
    ],
    icon,
    isShow: true,
    children: <p className="center-align sweet-alert-content">{content}</p>,
    onClose,
    title: LangHelper.getSingleResource('Confirmation'),
    ...customOption,
});

export const generateDefaultAlertOption = (content, onClose, onClick, icon = predefinedIcons.success) => ({
    buttons: [
        {
            text: LangHelper.getSingleResource('OK'),
            className: 'btn btn-apply',
            onClick: onClick || onClose,
        },
    ],
    icon,
    isShow: true,
    children: <p className="center-align sweet-alert-content">{content}</p>,
    onClose,
});
