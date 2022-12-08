const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error");
  }

  commandList = data.split(/\r?\n/);

  // splitData is an array of commands we need to process.

  let globalFileSystem = { "..": "top" };
  // command pointer is where in the command list we are, we can start at 1 since cd / is our top level object
  let commandPointer = 0;

  let sumDirectories = 0;

  let directoryToDelete = 48381165;

  const handleCommand = (filesystem, parent) => {
    // Before we do anything, check for a parent in the current directory, if there isn't one, assign it one
    if (!filesystem[".."]) {
      filesystem[".."] = parent;
    }
    if (!filesystem["totalFileSize"]) {
      filesystem["totalFileSize"] = 0;
    }
    // Move to next command in the stack, since the first command we don't care about
    commandPointer = commandPointer + 1;

    let command = commandList[commandPointer];
    // console.log("handling command", command);
    // console.log(filesystem[".."]);
    if (!command) {
      // we're out of commands to process, but we should still continue to proprogate file sizes up to the top
      if (filesystem[".."] !== "top") {
        // we need to continue to navigate upwards
        commandList.push("$ cd ..");
        //move pointer back one to handle new command
        commandPointer = commandPointer - 1;
        // console.log(
        //   "navigating back up to handle filesizing pass through to top directory"
        // );
        handleCommand(filesystem, 0);
      } else {
        console.log("Hit top directory, exit");
        commandPointer = commandPointer + 1;
        return;
      }
    }

    if (!command) {
      return null;
    }

    let commandArgs = command.split(" ");

    if (commandArgs[0] === "$") {
      // system command
      if (commandArgs[1] === "ls") {
        // We're listing files
        // We will read all of the next following lines to process new dir, and files

        // We can assume at least one file or directory is available
        let processingls = true;
        while (processingls) {
          // Increment our command pointer by one to read the next line
          commandPointer = commandPointer + 1;
          // Check if current line is file/dir or a system command

          let item = handleFileOrDir(commandList[commandPointer]);

          if (item.type === "dir") {
            // Add dir to current directory, empty since we're not aware of files in it
            filesystem[item.name] = {};
          } else {
            // add file to current directory
            filesystem[item.name] = item.fileSize;
            // We should be able to calcuate the total size of each directory at this point as well via a special property of the directory, similar to ".."
            filesystem["totalFileSize"] =
              filesystem["totalFileSize"] + item.fileSize;
          }
          // check if next line is command or file/dir
          if (checkIfNextLineCommand(commandList[commandPointer + 1])) {
            // If it is a command and not another file/dir, exit while loop
            processingls = false;
          }
        }
        // handle edge case where we move on before cd ..

        if (!commandList[commandPointer + 1]) {
          if (filesystem["totalFileSize"] <= 100000) {
            sumDirectories = sumDirectories + filesystem["totalFileSize"];
          }
        }
        // Once we've handled all of the files, we can move onto the next command
        handleCommand(filesystem, filesystem[".."]);
      } else if (commandArgs[1] === "cd") {
        // We're moving to another directory

        if (commandArgs[2] === "..") {
          // We're moving up a directory
          // .. points to a ref to the parent of the current directory

          // If we're exiting the current directory by navigating up, we can assume the totalFileSize won't change from here on out

          if (filesystem["totalFileSize"] <= 100000) {
            sumDirectories = sumDirectories + filesystem["totalFileSize"];
          }

          // For part 2

          // 48381165 is total space
          // 9335850 is wrong
          // 1112963
          if (41035571 - filesystem["totalFileSize"] < 40000000) {
            // possible directory we can delete
            if (filesystem["totalFileSize"] < directoryToDelete) {
              directoryToDelete = filesystem["totalFileSize"];
            }
          }

          // Pass current directory filesize into parent filesize, since the parent includes the current directory
          filesystem[".."]["totalFileSize"] =
            filesystem[".."]["totalFileSize"] + filesystem["totalFileSize"];
          handleCommand(filesystem[".."], filesystem);
        } else {
          // we're moving to a new directory
          handleCommand(filesystem[commandArgs[2]], filesystem);
        }
      }
    } else {
      console.log("error, read a non-system command somehow");
    }
  };

  const handleFileOrDir = (line) => {
    //     dir hwllqcd
    // 76103 jrhp.hgg

    let lineArgs = line.split(" ");

    if (lineArgs[0] === "dir") {
      // We have a directory listing
      return { type: "dir", name: lineArgs[1] };
    } else {
      return { type: "file", name: lineArgs[1], fileSize: Number(lineArgs[0]) };
    }
  };

  const checkIfNextLineCommand = (line) => {
    if (line) {
      let lineArgs = line.split(" ");
      if (lineArgs[0] === "$") {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  handleCommand(globalFileSystem);

  // Once our globalFileSystem object is built, we can now go through it recursivly to find the directories that match our requirements

  console.log("Total File size", globalFileSystem["totalFileSize"]);
  console.log("Total of summed directories to delete", sumDirectories);
  console.log("size of directory to delete", directoryToDelete);
});
