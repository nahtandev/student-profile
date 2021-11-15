// Import AbstractView
import AbstractView from "./AbstractView.js";
//
export default class extends AbstractView{
    constructor(){
        super();
        // Page Title
        this.setTitle("All Student");
    }
    // Return html page
    async getHTML(){
        return '<iframe src="html/all-student.html" class="iframe" frameborder="0"></iframe>';
    }
}

