// Dependencies
import Register from "../views/Register.js";
import AllStudent from "../views/AllStudent.js";
import Home from "../views/Home.js";

// Function to simulate Loader Effect. This Function load a loading page for a duration.
function loaderEffect(time, awaitFunction){
    // First, we display the loading page
    document.querySelector("#bloc-content").innerHTML = '<iframe src="assets/loader/loader.html" class="iframe" frameborder="0"></iframe>';   
    // Then, after the time indicated as argument, 
    setTimeout(() => {
        // we execute the function passed as argument.
        awaitFunction();
    }, time);
}

// Function which adds an entry to the browser session history stack
const navigateTo = url => {
    history.pushState(null, null, url) 
    loaderEffect(1000, router); /* Before adds entry, loader page is loading for 1 Second */
}

const router = async () => {
    const routes = [ /* List of front route valid in app */
        { path: "/", view: Home },
        { path: "/register", view: Register},
        { path: "/all-student", view: AllStudent }
    ]
    const potentialMatches = routes.map(route => { /* The map() method creates a new array populated with the results of
                                                    calling a provided function on every element in the calling array.
                                                    Here, it use  */
        return { /* return  */
            route: route, /* a route */
            isMatch: location.pathname === route.path /* and boolean to check if it active. If route is active, 
                                                        True is return, */
        };
    });
    
    /*The .find JS method returns the value of the first element in the provided array that satisfies the provided 
    testing function. If no values satisfy the testing function, undefined is returned */
    // Here, we use method .find to return value of the active route. If route is active, it return true.
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    
    /* If we try to access a route which is not defined or which does not exit, we are redirect to the home page.*/
    // If match return undefined, so then it is that he has an attempt to access a route which does not exit.
    if (!match) {
        match = { // So, we are redirect to the home page with home route
            route: routes[0],
            isMatch: true
        }
    }else{ /* Else that is correct route and is current route */
        let activeRoute = match.route.path; // Get Path of current route
        if (activeRoute == '/register') { // Use path to add CSS if the active button is Register Button
            $("#btn-add-student").addClass('btn-active');
        } else {// Use path to remove CSS if the Register Button is'nt Active
            $("#btn-add-student").removeClass('btn-active');
        }
        if (activeRoute == '/all-student') {// Use path to add CSS if the active button is All Student Button
            $("#btn-all-student").addClass('btn-active');
        } else {// Use path to remove CSS if the All Student Button is'nt Active
            $("#btn-all-student").removeClass('btn-active');
        }
    }
    const view = new match.route.view();
    document.querySelector("#bloc-content").innerHTML = await view.getHTML();
};

/* The Popstate Event of the Window interface is fired when the active history entry changes while
the user navigates the session history. It changes the current history entry to that of the last page
the user visited. */
// We using Event Popstate to navigate on the session history. 
window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", () => { /* After the initial HTML document hes been completly loaded and 
                                                        parsed, without waiting for stylesheets, images and subframes 
                                                        to finish loading. */
    document.body.addEventListener("click", e => { /* A clic on */
        if (e.target.matches("[data-link]")) { /* button has attribut data-link, */
            e.preventDefault(); /* blocking default click handing*/
            navigateTo(e.target.href); /* and navigate to link of button */
        }
    });

    // After loaded loading page, it start the router.
    loaderEffect(4000, router);
})