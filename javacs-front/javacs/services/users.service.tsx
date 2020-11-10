import { resolve } from "path";
import { HttpTransaction } from "./fetch";

export class UsersService extends HttpTransaction{
    static instance: UsersService;

    private constructor() {
        super();
    }

    static getInstance = () => {
        if(!UsersService.instance) {
            UsersService.instance = new UsersService();
        }

        return UsersService.instance;
    }
    
    getUsers = () => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data("users/", "GET").then(_result => {
                resolve(_result);
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        });
    }

    getSpecificUser = (email: string) => {
        return new Promise<any> ((resolve, reject) => {
            this.fetch_data('users/getid/'+email, "GET").then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    checkSpecificUser = (email: string) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('users/exists/'+email, "GET").then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    }

    addNewUser = (name: string, lastName: string, email: string) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('users/', "POST", {
                name: name,
                lastName: lastName,
                email: email
            }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    updateUser = () => {

    }

    deleteUser = () => {

    }
}