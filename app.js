const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require('chalk');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What type of employee?',
            name: 'employeeType',
            choices: [Manager, Engineer, Intern]
        },
    ])
        .then(answer => {

            if (answer.employeeType === 'Manager') {
                managerQuestions();
            } else if
               (answer.employeeType === 'Engineer') {
                engineerQuestions();
            } else if
               (answer.employeeType === 'Intern') {
                internQuestions();
            }
            else {
                console.log('Done!');
                return;
            }
        })
}

initialQuestion();

const internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the interns name?',
            name: 'internName'
        },
        {
            type: 'input',
            message: 'What is the interns employee id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the interns email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the interns school?',
            name: 'school',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },
    ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            employeeArr.push(intern);
            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                });
            }
        })
}

const engineerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the engineers name?',
            name: 'engineersName'
        },
        {
            type: 'input',
            message: 'What is the engineers employee id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the engineers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the engineers github username?',
            name: 'github',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },
    ])
        .then(answers  => {
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            employeeArr.push(engineer);
            console.log(employeeArr);

            if(answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                })
            }
        })
}

const managerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the managers name?',
            name: 'managerName'
        },
        {
            type: 'input',
            message: 'What is the managers id?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the managers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the managers office number?',
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: 'Do you need to enter another employee?',
            name: 'addCheck',
        },
    ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            employeeArr.push(manager);
            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('The file has been saved!'));
                });
            }
        })
}