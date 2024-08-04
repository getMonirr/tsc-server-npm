#!/usr/bin/env node

const { Command } = require("commander");
const simpleGit = require("simple-git");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

program
  .version("1.0.0")
  .argument("<app-name>", "name of the application")
  .action(async (appName) => {
    const targetDir = path.join(process.cwd(), appName);
    const repoUrl = "https://github.com/getMonirr/tsc-server-boilerplate.git";

    if (fs.existsSync(targetDir)) {
      console.error(`Directory ${appName} already exists.`);
      process.exit(1);
    }

    try {
      console.log("Cloning repository...");
      await simpleGit().clone(repoUrl, targetDir);

      console.log("Setting up the project...");
      await fs.remove(path.join(targetDir, ".git"));

      console.log(`Project ${appName} created successfully!`);
    } catch (err) {
      console.error(`Error creating project: ${err.message}`);
    }
  });

program.parse(process.argv);
