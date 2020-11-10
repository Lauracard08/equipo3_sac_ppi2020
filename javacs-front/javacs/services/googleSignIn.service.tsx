import * as GoogleSignIn from 'expo-google-sign-in';
import { async } from 'rxjs';
import { AuthService } from './auth.service';

export class GoogleSignInService {
    private authService = AuthService.getInstance();
    private static instance: GoogleSignInService;

    constructor() {
        if (GoogleSignInService.instance) {
            return GoogleSignInService.instance;
        }
    }

    static getInstance = () => {
        if (!GoogleSignInService.instance) {
            return GoogleSignInService.instance = new GoogleSignInService();
        }
        return GoogleSignInService.instance;
    };

    initAsync = async () => {
        await GoogleSignIn.initAsync();
        this.authService.isLoading = true;
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        if (user) {
            this.authService.isLoading = false;
            this.authService.signInForProvider(user, "login");
            return user;
        }
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.authService.signOutForProvider("logout");
    };

    signInAsync = async () => {
        try {
           this.authService.isLoading = true; 
           await GoogleSignIn.askForPlayServicesAsync();
           const {type, user} = await GoogleSignIn.signInAsync();
           return type;
        } catch ({message}) {
            alert('Login error: ' + message);
        }
    }
}