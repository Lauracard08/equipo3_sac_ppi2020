import { useState } from 'react'
import { Subject } from 'rxjs';
 
export class  MenuService {
    private static instance: MenuService;
    public menuDispacher = new Subject<any>();
    public nivelSelected = "";
    public total_questions = 0;
    public correct_answers = 0;

    constructor() {
        if (MenuService.instance) {
            return MenuService.instance;
        }
    }

    static getInstance = () => {
        if (!MenuService.instance) {
            MenuService.instance = new MenuService();
        }
        return MenuService.instance;
    }

    changeMenuStatus = () => {
        this.menuDispacher.next();
    }
}