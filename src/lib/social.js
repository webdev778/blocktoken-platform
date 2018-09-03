import hello from 'hellojs';

hello.init({
    facebook: 1456738254380084,
    google: '139700894213-90pmhsv3jrjaoln83f353fmjvspdibb9.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'});

export default(function () {
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
                hello.login('google', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        }
    }
})();
