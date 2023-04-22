import {Command} from 'commander';
import {PortfolioManager} from './PortfolioManager';

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
    const portfolioManager = new PortfolioManager('transactions.csv', 'USD');
    console.log('Parsing...');
    let portfolios;

    if (options.token && options.date) {
      await portfolioManager.createPortfolioForTokenAndDate(
        options.token,
        options.date
      );
      portfolios = portfolioManager.getLatesetPortfolios();
    } else if (options.token) {
      await portfolioManager.createLatestPortfolioForToken(options.token);
      portfolios = portfolioManager.getLatesetPortfolios();
    } else if (options.date) {
      await portfolioManager.createPortfoliosPerTokenForDate(options.date);
      portfolios = portfolioManager.getLatesetPortfolios();
    } else {
      await portfolioManager.createLatestPortfoliosPerToken();
      portfolios = portfolioManager.getLatesetPortfolios();
    }

    console.log(portfolios);
    portfolioManager.clearPortfolioValues();
  });

program.parse(process.argv);
