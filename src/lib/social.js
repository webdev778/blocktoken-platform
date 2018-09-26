import hello from 'hellojs';

hello.init({
    facebook: 457534721401204,
    google: '613507272855-5e9c8l9ga38upksv91mc1oveh3bsli26.apps.googleusercontent.com',
    linkedin: '81rsck5ovrvl28'
}, { redirect_uri: '/redirect.html' });

export default (function () {
    return {
        facebook: () => {
            return new Promise((resolve, reject) => {
                hello.login('facebook', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        },
        google: () => {
            return new Promise((resolve, reject) => {
                hello.login('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        },
        linkedin: () => {
            return new Promise((resolve, reject) => {
                hello.login('linkedin', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        },
    }
})();
