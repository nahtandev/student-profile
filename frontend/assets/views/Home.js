// import AbstractView
import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
    constructor() {
        super();
        // Page Title
        this.setTitle("Student Profile");
    }
    async getHTML() {
        // return html page
        return '<iframe src="html/home.html" class="iframe" frameborder="0"></iframe>';
    }
}