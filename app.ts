#! /usr/bin/env node

import chalk from "chalk";
import { log } from "console";
import inquirer from "inquirer";
import Choice from "inquirer/lib/objects/choice.js";
import Choices from "inquirer/lib/objects/choices.js";

let todos : string[] = [];
let conditions = true;

//Decorating my todo list
console.log(chalk.bold.italic.cyanBright("\n\t***---*** Welcome to Arisha Ghaffar's To-do List ***---***\n"));



let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name:"choice",
                type:"list",
                message:"Select an Option:",
                choices: ["Add Task","Delete Task","Update Task","View Todo-List","Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask()
        }
        else if (option.choice === "Delete Task") {
            await deleteTask()
        }
        else if (option.choice === "Update Task") {
            await updateTask()
        }
        else if (option.choice === "View Todo-List") {
            await viewTask()
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
}
//function to add new task to the list
let addTask = async ()=>{
    let newTask = await inquirer.prompt([
        {
            name:"task",
            type:"input",
            message:"Enter your new task",
        }
    ]);
    todos.push(newTask.task);
    console.log(chalk.bold.italic.yellowBright(`\n ${newTask.task} task added successfully in Todo-List\n`));
}

//Function to view all Todo-List Tasks
let viewTask = () => {
    console.log(chalk.bold.italic.green.underline("\n Your Todo-List: \n"));
    todos.forEach((task,index)=>{
    console.log(chalk.bold.italic.redBright(`${index + 1}: ${task}`));
    })
}

//function too delete a task
let deleteTask =async ()=>{
    await viewTask()
    let taskIndex = await inquirer.prompt({
        name:"index",
        type:"number",
        message:"Enter the index no. of the task you want to delete: "
    });
    let deletedTask = todos.splice(taskIndex.index -1, 1);
    console.log(chalk.bold.italic.yellowBright(`\n ${deletedTask} this task has been deleted sucessfully from the list\n`));
    
}

//function to update a task
let updateTask = async()=>{
    await viewTask()
    let updateTask_Index = await inquirer.prompt([
        {
            name:"index",
            type:"number",
            message:"Enter the index no. of the task you want to update:"
        },
        {
            name:"new_Task",
            type:"input",
            message:"Now enter name of new task",
        }
    ]);
    todos[updateTask_Index.index -1] = updateTask_Index.new_Task
    console.log(chalk.bold.underline.greenBright(`\n Task at index no. ${updateTask_Index.index -1} updated successfully\n `));
    
}
main()