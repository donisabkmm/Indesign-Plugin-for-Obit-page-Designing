// Developed by Donis Abraham
// Developer at Malayala Manorama
// Date 10-10-2023


// Initialize global variables
let user_name = ''
let password_json = ''
let delimited_path_new = ""
let rtf_path_new = ""
let media_path_new = ""
let page_path_new = ""
let template_path_new = ""


//Calling buttons and panel using there id
const admin = document.getElementById('admin');
const login = document.getElementById('admin-panel-login');
const cancel = document.getElementById('cancel-btn');
const submit = document.getElementById('login-btn');
const close_btn = document.getElementById('close-btn');


// setting panel default display styles
document.getElementById('admin-panel-form').style.display = 'none';
login.style.display = 'none';


// Calling default running functions
auth();
readPreferencesToJS();



// Function definition for admin authentication 
async function auth() {
    const jsonFileURL = 'assets/config/app_config.json';

    fetch(jsonFileURL)

        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON Data:', data);
            user_name = data.username;
            password_json = data.password;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}


// Function definition for reading preference file for dedicated path and store it in a variable
async function readPreferencesToJS() {
    const fs = require('fs');
    const os = require("os");
    const pref_file = os.homedir() + "\\AppData\\Local\\app-pref.json";
    try {
        fs.readFile(pref_file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            jsondata = JSON.parse(data)
            console.log(jsondata)
            const delimited_path = jsondata.delimited_path;
            document.getElementById("delimited-path").innerHTML = delimited_path;
            document.getElementById("delimited-path").value = delimited_path;

            const rtf_path = jsondata.rtf_path;
            document.getElementById("rtf-path").innerHTML = rtf_path;
            document.getElementById("rtf-path").value = rtf_path;

            const media_path = jsondata.media_path;
            document.getElementById("media-path").innerHTML = media_path;
            document.getElementById("media-path").value = media_path;

            const page_path = jsondata.page_path;
            document.getElementById("page-path").innerHTML = page_path;
            document.getElementById("page-path").value = page_path;

            const template_path = jsondata.template_path;
            document.getElementById("template-path").innerHTML = template_path;
            document.getElementById("template-path").value = template_path;

        });
    } catch (e) {
        console.log(e);
    }
}


// Action for admin button click
admin.addEventListener('click', function () {
    if (login.style.display === 'none') {
        login.style.display = 'block';
    }
});


// Action for login button click in admin login panel
submit.addEventListener('click', function () {
    const { app } = require("indesign");
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === user_name && password === password_json) {
        document.getElementById('admin-panel-form').style.display = 'block';
        login.style.display = 'none';
    }
    else 
    {
        document.getElementById("error-box").show();
        document.getElementById("ErrorTXT").innerHTML = "Please enter correct username and password....";
    }
});


// Action for cancel button click in admin login panel
cancel.addEventListener('click', function () {
    if (login.style.display === 'block') {
        login.style.display = 'none';
    }
});


// Action for close button in admin preference panel
close_btn.addEventListener('click', function () {
    document.getElementById('admin-panel-form').style.display = 'none';
    document.getElementById('username').value = null;
    document.getElementById('password').value = null;
});


// Action for delimited_button click in admin preference panel
document.getElementById("delimited-btn").addEventListener("click", function () {
    const fs = require("uxp").storage.localFileSystem;
    const folder = fs.getFolder();

    folder
        .then(selectedFolder => {
            delimited_path_new = selectedFolder.nativePath;
            document.getElementById('delimited-path').value = delimited_path_new
        })
        .catch(error => {
            console.log(error);
            document.getElementById("folderLocation").innerText = "Error selecting folder.";
        });
});


// Action for rtf_button click in admin preference panel
document.getElementById("rtf-btn").addEventListener("click", function () {
    const fs = require("uxp").storage.localFileSystem;
    const folder = fs.getFolder();

    folder
        .then(selectedFolder => {
            rtf_path_new = selectedFolder.nativePath;
            document.getElementById('rtf-path').value = rtf_path_new

        })
        .catch(error => {
            console.log(error);
            document.getElementById("folderLocation").innerText = "Error selecting folder.";
        });
});


// Action for media_btn click in admin preference panel
document.getElementById("media-btn").addEventListener("click", function () {
    const fs = require("uxp").storage.localFileSystem;
    const folder = fs.getFolder();

    folder
        .then(selectedFolder => {
            media_path_new = selectedFolder.nativePath;
            document.getElementById('media-path').value = media_path_new

        })
        .catch(error => {
            console.log(error);
            document.getElementById("folderLocation").innerText = "Error selecting folder.";
        });
});


// Action for page_button click in admin preference panel
document.getElementById("page-btn").addEventListener("click", function () {
    const fs = require("uxp").storage.localFileSystem;
    const folder = fs.getFolder();

    folder
        .then(selectedFolder => {
            page_path_new = selectedFolder.nativePath;
            document.getElementById('page-path').value = page_path_new

        })
        .catch(error => {
            console.log(error);
            document.getElementById("folderLocation").innerText = "Error selecting folder.";
        });
});


// Action for template_button click in admin preference
document.getElementById("template-btn").addEventListener("click", function () {
    const fs = require("uxp").storage.localFileSystem;
    const folder = fs.getFolder();

    folder
        .then(selectedFolder => {
            template_path_new = selectedFolder.nativePath;
            document.getElementById('template-path').value = template_path_new

        })
        .catch(error => {
            console.log(error);
            document.getElementById("folderLocation").innerText = "Error selecting folder.";
        });
});


// Action for save_button in admin preference panel
document.getElementById('save-btn').addEventListener("click", async function () {
    document.getElementById('admin-panel-form').style.display = 'none';
    const preferences = {
        "delimited_path": delimited_path_new,
        "rtf_path": rtf_path_new,
        "media_path": media_path_new,
        "page_path": page_path_new,
        "template_path": template_path_new,
        "email":"obit<p>@mm.co.in",
        "odd_temp":"OddObit.indt",
        "even_temp":"EvenObit.indt"
    };
    writePreferencesToFile()

    async function writePreferencesToFile() {
        const fs = require('fs');
        const os = require("os");
        const appDataFolder = os.homedir() + "\\AppData\\Local\\app-pref.json";
        console.log(appDataFolder)
        try {
            fs.writeFile(appDataFolder, JSON.stringify(preferences), {encoding: "utf-8"});
        } catch (e) {
            console.log(e);
        }
    }
});

// Action for Open_button in BasePanel
document.getElementById("OpenFile-form").style.display = 'none';
document.getElementById("dak-open").addEventListener('click', function () {
    if (document.getElementById("OpenFile-form").style.display === 'none') {
        document.getElementById("OpenFile-form").style.display = 'block';
    }
});
document.getElementById("closeOpenform").addEventListener('click', function () {
    if (document.getElementById("OpenFile-form").style.display === 'block') {
        document.getElementById("OpenFile-form").style.display = 'none';
    }
});
// Action for New_button in BasePanel
document.getElementById("createFile-form").style.display = 'none';
document.getElementById("dak-new").addEventListener('click', function () {
    if (document.getElementById("createFile-form").style.display === 'none') {
        document.getElementById("createFile-form").style.display = 'block';
    }
});
document.getElementById("closeNewform").addEventListener('click', function () {
    if (document.getElementById("createFile-form").style.display === 'block') {
        document.getElementById("createFile-form").style.display = 'none';
    }
});

// Action for Advanced_btn
document.getElementById("advanced-panel-form").style.display = 'none';
document.getElementById("Advanced-btn").addEventListener('click', function () {
    if (document.getElementById("advanced-panel-form").style.display === 'none') {
        document.getElementById("advanced-panel-form").style.display = 'block';
        document.getElementById('admin-panel-form').style.display = 'none';

    }
});


document.getElementById("closeAdvanced").addEventListener('click', function () {
    if (document.getElementById("advanced-panel-form").style.display === 'block') {
        document.getElementById("advanced-panel-form").style.display = 'none';

    }
});


document.getElementById("ok-btn").addEventListener('click', function () {
        document.getElementById("error-box").close();
});