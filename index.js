#!/usr/bin/env node

// making it as a global command and telling that it should run in node enviroment. taki jab vo enviroment varaibles mai jaye toh apna path dekh sake and apne enviroment mai run kare
const fs = require("fs");
let arguments = process.argv.slice(2); // process.argv returns the array with first two index node and index.js

// flag for -commands and filename for files
let flags = [];
let filenames = [];
let secondaryArguments = [];

// segration of files and wcat commands
for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }
    else if(i[0] == "%"){
        secondaryArguments.push(i.slice(1)); // to remove percentage in our actual execution
    }
    else{
        filenames.push(i);
    }
}


// //1 print one file after the other
// // wcat f1 f2 f3 f4........................(without any flag)
// if(flags.length == 0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }
// else{
//     for(let flag of flags){
//             // 2. wcat -rs f1 f2 f3 f4 ........................... -rs can be type anywhere to remove all the spaces
//              // -rs is used here to print each files without a space 
//         if(flag =="-rs"){
//             for(let file of filenames){
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 console.log(fileData.split(" ").join(""));
//             }
//         }


//     }
// }



// INSTRUCTION
// optimized code we used this code so that we dont need to work for multiple cat commands

//1 print one file after the other
// // wcat f1 f2 f3 f4........................(without any flag)

// 2. wcat -rs f1 f2 f3 f4 ........................... -rs can be type anywhere to remove all the spaces
// -rs is used here to print each files without a space 

// 3. wcat -rn f1 f2 f3 f4 ........................... -rn can be type anywhere to remove all the new lines
// -rn is used here to print each files without a new line

// 4. wcat -rsc f1 f2 f3 f4......................... to remove all the special characters.
// here secondary arguments will also be used for which special character is to be removed

// 5. wcat -s f1 f2 f3 f4............. assign numbers to lines of each file in beginning including empty lines

// 6. wcat -sn f1 f2 f3 f4 ........... assign numbers to lines of each file which are non empty

// 7. wcat -rel f1 f2 f3 f4 ............ remove extra lines i.e. only one single line in continuation

for(let file of filenames){
    let fileData = fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if(flag == "-rs"){
            fileData = removeAll(fileData," ");
        }
        if(flag == "-rn"){
           fileData = removeAll(fileData,"\r\n");
        }
        if(flag == "-rsc"){
            // to remove those characters which have special meaning write them as string in terminals.
            for(let secondaryArgument of secondaryArguments){
                fileData = removeAll(fileData,secondaryArgument);
            }
        }
        if(flag == "-s"){
            fileData = addSequence(fileData)
        }
        if(flag == "-sn"){
            fileData = addSequencefornonempty(fileData);
        }
        if(flag == "-rel"){
            fileData = removeExtraline(fileData);
        }
    }
    console.log(fileData);
}

function removeAll(string , removaldata){
    return string.split(removaldata).join("");
}

function addSequence(content){
    let contentArr = content.split("\n");
    let string = "";
    for(let i=0;i<contentArr.length;i++){
        string += (i+1) +" "+ contentArr[i] + "\n"; 
    }
    return string;
}

function addSequencefornonempty(content){
    let contentArr = content.split("\n");
    let string = "";
    let linenum = 1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i].length > 0){
            string += linenum +" "+ contentArr[i] + "\n";
            linenum++;
        }
        else{
            string += "\n";
        }
    }
    return string;
}


function removeExtraline(content){
    let x = true; // to check weather we have to remove line or not 
    let string = "";
    let contentArr = content.split("\n");
    for(let i=0;i<contentArr.length;i++){

        if(contentArr[i].length == 1 && x==false){
            continue;
        }
        
        if(contentArr[i].length > 1){
            string += contentArr[i] + "\n";
            x = true;
        }
        else if(contentArr[i].length == 1 && x == true){
            string += contentArr[i] + "\n"
            x = false;
        }
    }
    return string;
}





