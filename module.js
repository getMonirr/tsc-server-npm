#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

const createModule = (name) => {
  const files = [
    "constant",
    "controller",
    "interface",
    "model",
    "route",
    "service",
    "utils",
    "validation",
  ];
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  const targetDir = path.join(process.cwd(), "src", "modules", nameCapitalized);

  if (fs.existsSync(targetDir)) {
    console.error(`Module directory ${name} already exists.`);
    process.exit(1);
  }

  fs.ensureDirSync(targetDir);

  files.forEach((file) => {
    const filePath = path.join(targetDir, `${name}.${file}.ts`);
    const content = `// ${nameCapitalized} ${file} file`;

    fs.writeFileSync(filePath, content);
    console.log(`Created ${filePath}`);
  });
};

program
  .argument("<name>")
  .description(
    "Create a module with related files (model, controller, routes, services)"
  )
  .action(createModule);

program.parse(process.argv);
