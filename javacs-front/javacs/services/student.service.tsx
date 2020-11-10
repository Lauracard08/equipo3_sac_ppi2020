import { HttpTransaction } from "./fetch";

export class StudentService extends HttpTransaction {
    static instance: StudentService;
    
    private constructor () {
        super();
    }

    static getInstance = () => {
        if(!StudentService.instance) {
            StudentService.instance = new StudentService();
        }

        return StudentService.instance;
    }

    syncStudent = (userId: number) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('student/add', "POST", {
                userId: userId
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    addCompleteQuestion = (userId: number, question: number) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('student/responses/addCorrect/'+userId, "PUT", {
                questionId: question
            });
        });
    }

    addProgress = (userId: number) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('student/progress/update/' + userId, "PUT", {}).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    getUser = (userId: number) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data('student/'+userId, "GET").then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        });
    }
}