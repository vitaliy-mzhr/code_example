import Noty from 'noty';
import noop from 'lodash/fp/noop';

import { NOTY_CONFIG } from '../config';



export const notification = (text, type = 'info', options = {}) => {
    if (!process.browser) return false;

    new Noty({
        ...NOTY_CONFIG,
        text,
        type,
        ...options
    }).show();
};



export const dialogConfirm = (text, confirmBtnText, dismissBtnText, onConfirmFn = noop, onDismissFn = noop, options = {}) => {
    if (!process.browser) return false;

    const buttons = [
        Noty.button(confirmBtnText, 'btn', () => {
            onConfirmFn(closeModal);
        }),

        Noty.button(dismissBtnText, 'btn', () => {
            onDismissFn();
            closeModal();
        })
    ];

    const n = new Noty({
        ...NOTY_CONFIG,
        type: 'info',
        timeout: false,
        text: text,
        buttons,
        ...options
    });
    const closeModal = n.close.bind(n);

    n.show();
};
