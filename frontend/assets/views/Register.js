// Import AbstactView.js
import AbstractView from "./AbstractView.js";
// 
export default class extends AbstractView {
    constructor() {
        super();
        // Page title
        this.setTitle("Add Student");
    }
    async getHTML() {
        // Return html page
        return '<iframe src="html/register.html" class="iframe" frameborder="0"></iframe>';
    }
}

