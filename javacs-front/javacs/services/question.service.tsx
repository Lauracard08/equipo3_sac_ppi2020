import { HttpTransaction } from "./fetch";

export class QuestionService extends HttpTransaction {
    static instance: QuestionService;

    private constructor() {
        super();
    }

    static getInstance = () => {
        if (!QuestionService.instance) {
            QuestionService.instance = new QuestionService();
        }

        return QuestionService.instance;
    }

    getQuestions = () => {
        
    }

    getQuestionsForCategory = (category: string) => {
        return new Promise<any>((resolve, reject) => {
            this.fetch_data("question/getCategory/"+category, "GET").then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    addQuestion = (question: string, answers: any[], answer: number, category: string) => {
        return new Promise<any>((resolve, reject) => {
            var _answers = "";
            answers.forEach(_answer => {
                _answers += _answer.answerText + "|"
            });
            _answers = _answers.substr(0, _answers.length - 1);
            var body = {
                question: question,
                answers: _answers,
                answer: answer,
                category: category
            }
            this.fetch_data("question", "POST", body).then(_result => {
                resolve(_result);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
}