import {Command} from 'commander';

const program = new Command();

program
  .name('node ./build/src/index.js')
  .description('CLI to view token deposit amount for parameters')
  .version('1.0.0');

program
  .command('portfolio')
  .option('--token <string>', 'specify token')
  .option('--date <string>', 'specify date')
  .action(async options => {
    console.log(options);
  });

program.parse(process.argv);
