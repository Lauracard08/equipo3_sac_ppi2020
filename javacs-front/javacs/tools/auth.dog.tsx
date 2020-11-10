export class AuthDogService {
    private static instance: AuthDogService;

    constructor() {
        if (AuthDogService.instance) {
            return AuthDogService.instance;
        }
    }

    static getInstance = () => {
        if (!AuthDogService.instance) {
            return AuthDogService.instance = new AuthDogService();
        }

        return AuthDogService.instance;
    }

    getCurrentRouteName = (navigateState: any):any => {
        if (!navigateState) {
            return null;
        }
        
        const routesStackLength = navigateState.length - 1;
        let previousScreen = undefined;
        let currentScreen = undefined;
        if (routesStackLength > 0)
            previousScreen = navigateState[routesStackLength - 1].name;

        currentScreen = navigateState[routesStackLength].name;
        return {previous: previousScreen, current: currentScreen};
    }
}