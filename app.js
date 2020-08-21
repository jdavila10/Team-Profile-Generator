const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIRECTORY = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIRECTORY, "fullteam.html")
const render = require('./lib/htmlRenderer');

addManager();
let finalTeam = [];


function addManager() {
    inquirer.prompt([
        {
            message: "What is the manager's name?",
            name: "name"
        },
        {
            message: "What is the manager's email address?",
            name: "email"
        },

        {
            type: "number",
            message: "What is the manager's office number?",
            name: "officeNumber"
        },
    ])
    .then(function (data) {
        const name = data.name
        const id = finalTeam.length + 1
        const email = data.email
        const officeNumber = data.officeNumber
        const teamMember = new Manager(name, id, email, officeNumber)
        finalTeam.push(teamMember)
        addTeamMember();
    });
};

function addTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Add an Engineer", "Add an Intern", "No"],
            name: "addMember"
        }
    ])

        .then(function (data) {

            switch (data.addMember) {
                case "Add an Engineer":
                    addEngineer();
                    break;
                case "Add an Intern":
                    addIntern();
                    break;
                case "No":
                    completeTeam();
                    break;
            }
        });
};
function addEngineer() {
    inquirer.prompt([
        {
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeam.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            finalTeam.push(teamMember)
            addTeamMember()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name?",
            name: "name"
        },
        {
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            message: "What is the intern's school?",
            name: "school"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeam.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            finalTeam.push(teamMember)
            addTeamMember()
        });

};



function completeTeam() {
    console.log(finalTeam)  
    if (!fs.existsSync(OUTPUT_DIRECTORY)) {
        fs.mkdirSync(OUTPUT_DIRECTORY)
}
    fs.writeFileSync(outputPath, render(finalTeam),"utf-8")
    
}






