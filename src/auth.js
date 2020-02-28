const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
        console.log('auth true');
        
    },
    signout(cb) {
        this.isAuthenticated = false;
        localStorage.setItem('memo-token','')
        setTimeout(cb, 100);
    }
};

export default fakeAuth;