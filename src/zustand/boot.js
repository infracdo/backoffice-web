

import authStore from '@zeep/zustand/auth/';

export default () =>
    new Promise(() => {
        authStore().checkAuthorization();
    });