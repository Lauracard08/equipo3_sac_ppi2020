import * as firebase from 'firebase';
import { GoogleUser } from 'expo-google-sign-in';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import AsyncStorage from '@react-native-community/async-storage';
import { UsersService } from './users.service';
import { StudentService } from './student.service';


export class AuthService {
    private static instance: AuthService;
    private userService = UsersService.getInstance();
    private studentService = StudentService.getInstance();
    public isInRegisterPage = false;

    public user: User = {
        email: "",
        firstName: "",
        lastName: "",
        photoUrl: ""
    }
    public userType = false; // true is for docent, false is for student
    public isLogin = false;
    public isLoading = false;
    public firebaseObserver = null;
    public loginMethod = false; // If is false is firebase else is google
    public attach = new Subject<{ // Observable to send login messages to the subscribers
        type: string,
        message: string
    }>();

    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }
    }

    storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }

    getItem = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return "" + value;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Return the instance of the singleton
     */
    static getInstance = () => {
        if (firebase.apps.length == 0)
            firebase.initializeApp({
                apiKey: "AIzaSyAJXGJcUdOLPhdMIpOyC4NSqSI3mSv7WRw",
                authDomain: "javacs-f213a.firebaseapp.com",
                databaseURL: "https://javacs-f213a.firebaseio.com",
                projectId: "javacs-f213a",
                storageBucket: "javacs-f213a.appspot.com",
                messagingSenderId: "375818050692",
                appId: "1:375818050692:web:ff6e5f4bab1948947736d1"
            });

        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
            if (firebase.apps.length > 0) {
                firebase.auth().onAuthStateChanged((user) => {
                    AuthService.instance.getItem('userType').then(value => {
                        AuthService.instance.userType = (value === '1');
                    });

                    if (user) {
                        if (AuthService.instance.user.email == "") {
                            AuthService.instance.userService.getSpecificUser("" + user.email).then(__result => {
                                AuthService.instance.user.uid = user.uid;
                            });
                            AuthService.instance.user.email = user.email;
                            AuthService.instance.user.firstName = user.displayName;
                            AuthService.instance.user.lastName = "";
                            AuthService.instance.user.photoUrl = user.photoURL;
                            AuthService.instance.isLogin = true;
                            AuthService.instance.loginMethod = false;
                        }

                        AuthService.instance.attach.next({
                            type: "login",
                            message: "login"
                        });
                    }
                    else {
                        if (!AuthService.instance.isLogin)
                            AuthService.instance.attach.next({
                                type: "logout",
                                message: "logout"
                            });
                    }
                });
            }
        }
        return AuthService.instance;
    }

    /**
     * Register a new user in the system
     * @param email Email of the user who is register in the system
     * @param password Password to assing to the user
     */
    signUp = async (email: string, password: string, userType: string, user: string): Promise<User> => {
        this.userType = (userType == 'estudiante' ? false : true);
        if (userType == 'estudiante') {
            this.storeData('userType', "0");
        }
        else {
            this.storeData('userType', "1");
        }

        return new Promise<User>((response, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(_response => {
                    var user_divide = user.split(' ');
                    this.userService.addNewUser(user_divide[0], user_divide[1] + (user_divide[2] ? " " + user_divide[2] : ""), email).then(__response => {
                        this.user.email = __response.email;
                        this.user.firstName = __response.nombre;
                        this.user.lastName = __response.apellido;
                        this.user.photoUrl = "";
                        this.user.uid = _response.user?.uid;
                        this.user.id = __response.id;
                        this.isLogin = true;
                        this.loginMethod = false;
                        if (userType == "estudiante") {
                            this.studentService.syncStudent(__response.id).then(_ => {

                                response(this.user);
                            }).catch(error => {
                                reject(error);
                            });
                        }
                        else {
                            response(this.user);
                        }
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    alert("Ha ocurrido un error en el login");
                    console.log(error);
                    this.isLogin = false;
                    reject(error);
                });
        });
    }

    /**
     * Authenticate a user in the system
     * @param email Email to identify the user
     * @param password Password to authenticate the user
     */
    signIn = async (email: string, password: string): Promise<any> => {
        return new Promise<User>((response, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
                this.userService.getSpecificUser(email).then(__result => {

                    this.getItem('userType').then(value => {
                        this.userType = (value === '1');
                        if (!this.userType) {
                            this.userService.checkSpecificUser(email).then(_result => {
                                if (!_result.student) {
                                    this.studentService.syncStudent(__result[0].id);
                                }
                            });
                        }
                    });
                    this.user.id = __result[0].id;
                    this.user.email = result.user?.email;
                    this.user.firstName = __result[0].nombre;
                    this.user.lastName = __result[0].apellido;
                    this.user.photoUrl = "";
                    this.user.uid = result.user?.uid;
                    this.isLogin = true;
                    this.loginMethod = false;
                    response(this.user);
                });
            }).catch(error => {
                alert("Ha ocurrido un erorr identificandote");
                console.log(error);
                this.isLogin = false;
                reject(error);
            });
        });
    }

    /**
     * Remove the current user from the system
     */
    signOut = () => {
        firebase.auth().signOut().then(() => {
            this.isLogin = false;
        }).catch(error => {
            alert("Ha ocurrido un error al intentar desloguearte");
            console.log(error);
        });
    }

    resetPawssword = () => {
        return new Promise<boolean>((response, reject) => {
            console.log(this.user.email)
            firebase.auth().sendPasswordResetEmail("" + this.user.email).then(_ => {
                response(true);
            }).catch(error => {
                reject(error);
                console.log(error)
            });
        });
    }

    /**
     * Save the login of a new user identified by a provider
     * @param user User register in the system with a login provider
     * @param status Status of the transaction efected for the provider
     */
    signInForProvider = async (user: GoogleUser | null, status: string) => {
        this.getItem('userType').then(value => {
            this.userType = (value === '1');
        });

        this.userService.checkSpecificUser("" + user?.email).then(result => {

            if (!result.users)
                this.userService.addNewUser("" + user?.firstName, "" + user?.lastName, "" + user?.email).then(result => {
                    if (!this.userType)
                        this.studentService.syncStudent(result.id);
                });

            if (!result.student && !this.userType)
                this.userService.getSpecificUser("" + user?.email).then(result => {
                    this.studentService.syncStudent(result[0].id);
                });
                else
                this.userService.getSpecificUser(""+user?.email).then(___result => {
                    this.user.id = ___result[0].id;
                });

            if (user) {
                this.user.uid = user.uid;
                this.user.email = user.email;
                this.user.firstName = user.firstName;
                this.user.lastName = user.lastName;
                this.user.photoUrl = user.photoURL;

                this.isLogin = true;
                this.loginMethod = true;
            }
            else
                this.isLogin = false;

            this.attach.next({
                type: "login",
                message: status
            });
        });
    }

    signOutForProvider = async (status: string) => {
        this.isLogin = false;
        this.loginMethod = false;
        this.attach.next({
            type: "logout",
            message: status
        });
    }
}