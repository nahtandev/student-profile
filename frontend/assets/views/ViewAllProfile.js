// Makes some ajax request with a link and his data.
function ajax_request(link, method, data, success = null, failed = null) {
    // Creating a new "xml http request" and Opens the xhr with the passed parameters.
    let xhr = new XMLHttpRequest(); xhr.open(method, link, true);
    // Changes the default header.
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    // Sends the passed data.
    xhr.send(JSON.stringify(data)); xhr.onload = () => {
        // A 200 status has been returned.
        if (xhr.status === 200) success(JSON.parse(xhr.responseText), xhr.status);
        // Otherwise.
        else failed(xhr.status);
    }
}

// Creating Student Profile Class
function StudentProfileViewer() {
    // Add a profile 
    this.add_data = (firstName, lastName, email, age, university, phone) => {
        // Generates the HTML template
        $('body').append('<div class="d-flex one-student justify-content-around align-items-center">\
                    <div class="bi-person-circle"></div>\
                    <div class="bio">\
                        Hi. I am <span class="font-weight-bold">'+ firstName + '</span> <span class="last-name">' + lastName + '</span> and I\'m\
                        <span>' + age + '</span> years old.\
                        I\'m at <span class="university">' + university + '</span><br>\
                        Contact me:\
                        <ul class="contact">\
                            <li>' + phone + '</li>\
                            <li> ' + email + ' </li>\
                        </ul>\
                    </div>\
                </div>');
    }
}

// Loads saved Profile data from the database
function load_profile_data() {
    // Creating a new profile viewer
    let profileViewer = new StudentProfileViewer();
    // Calls ajax requester to get all saved profile from database.
    ajax_request("/all-profile", "POST", new Object({}), server_data => {
        if (server_data == '') /* If no data, */ {
            // Display No Data Message
            $(".no-data-message-bloc").css("display", "flex");
        }
        else { /* If data, */
            // Hide No Data Message
            $(".no-data-message-bloc").css("display", "none");
            for (let profile_data of server_data) {
                // Use Class profileViewer to display All Profile Student.
                profileViewer.add_data(profile_data.first_name, profile_data.last_name, profile_data.email, profile_data.age, profile_data.university, profile_data.phone);
            }
        }/* If Failed ajax request, display error in console */
    }, status => console.error("Failled to make request", status));
}

// Load All Profile Data
load_profile_data();
