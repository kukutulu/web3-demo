/* eslint-disable no-console */
import { execSync } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForCommitMessage = () => {
  rl.question('Enter commit message: ', (commitMessage) => {
    // Trim the message to remove whitespace
    const message = commitMessage.trim();

    if (!message) {
      console.log('\nCommit message cannot be empty. Please try again.');
      // Ask again if message is empty
      askForCommitMessage();
      return;
    }

    try {
      // Execute git commands
      console.log('\nAdding files...');
      execSync('git add .');

      console.log('Committing changes...');
      execSync(`git commit -m "${message}"`);

      console.log('Pushing to remote...');
      execSync('git push');

      console.log('\nSuccess! All changes have been pushed.');
    } catch (error) {
      console.error('\nError:', error.message);
    } finally {
      rl.close();
    }
  });
};

// Start the process
askForCommitMessage();
