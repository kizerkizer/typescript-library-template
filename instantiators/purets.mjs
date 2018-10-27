import
    fs from 'fs';

import
    cl from 'shelljs';

export default async (projectName, dirname) => {
    // Copy in the template.
    cl.cp('-r', join(__dirname, 'template/**/*'), '.');

    // Remove default `package.json`.
    cl.rm('package.json');
    cl.mv('package.purets.json', 'package.json');

    // Replace template variables.
    replaceVariableInFile('README.md', 'name', name);

    // Copy dotfiles in explicity as they are missed otherwise.
    for (let file of fs.readdirSync('./dotfiles')) {
        fs.writeFileSync(`.${file}`, fs.readFileSync(join('dotfiles', file)));
    }
    cl.rm('-r', './dotfiles');

    // Initialize packages.
    console.log('npm install...');
    cl.exec('npm install');

    // Initialize git.
    console.log('git init');
    cl.exec('git init');

    console.log(`Project \`${name}\` was created successfully.`);
    console.log(`A git repository was initialized.`);
};

function replaceVariableInFile (filePath, variableName, variableSubstitution) {
    let file = fs.readFileSync(filePath).toString();
    file.replace(new RegExp(`%${variableName}%`, 'g'), variableSubstitution);
    fs.writeFileSync(filePath, file);
}