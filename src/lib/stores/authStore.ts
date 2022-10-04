import { writable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Auth, UserInfo } from 'firebase/auth';

const authStore = writable<{
    isLoggedIn: boolean,
    user?: UserInfo
}>({
    isLoggedIn: false,
});

let app: FirebaseApp;

const init = () => {
    app = initializeApp(firebaseConfig);
}

const login = () => {
    if (!app) {
        return;
    }
    const auth: Auth = getAuth(app);
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
        authStore.set({ isLoggedIn: true, user: result.user })
    });
}

const logout = () => {
    if (!app) {
        return;
    }
    const auth: Auth = getAuth(app);
    signOut(auth).then(() => {
        authStore.set({ isLoggedIn: false, user: undefined })
    });
}

export default {
    subscribe: authStore.subscribe,
    init,
    login,
    logout
}