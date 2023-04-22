import {CsvHandler} from './CsvHandler';
import {DateFormatter} from './DateFormatter';
const path = require('path');
const axios = require('axios');

type Transaction = {
  token: string;
  amount: number;
  timestamp: number;
};

type Portfolio = {
  balance: string;
  portfolioValue: string;
};

export class PortfolioManager {
  transactions: Record<string, Transaction>;
  csvHandler: CsvHandler;
  filePath: string;
  portfolioValuesPerTokenInSymbol: Portfolio[] = [];
  symbol: string;

  constructor(fileName: string, symbol: string) {
    this.transactions = {};
    this.symbol = symbol;
    this.csvHandler = new CsvHandler();
    this.filePath = path.resolve(__dirname, '..', '..', 'data', fileName);
  }

  async getCryptoDataFromAPI(token: string) {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=${this.symbol}`
    );
    return response.data;
  }

  convertPortfolioToSymbolPrice(amount: number, crypto: number): number {
    return amount * crypto;
  }

  getLatesetPortfolios(): Portfolio[] {
    return this.portfolioValuesPerTokenInSymbol;
  }

  setPortfolioValue(
    token: string,
    balance: number,
    portfolioValue: number
  ): void {
    this.portfolioValuesPerTokenInSymbol.push({
      balance: `${balance} ${token}`,
      portfolioValue: `${portfolioValue} ${this.symbol}`,
    });
  }

  clearPortfolioValues() {
    this.portfolioValuesPerTokenInSymbol = [];
  }

  async retrievePortfolioValues(): Promise<void> {
    for (const [key, value] of Object.entries(this.transactions)) {
      const token: string = value['token'];
      const balance: number = value['amount'];
      try {
        const cryptoData = await this.getCryptoDataFromAPI(token);
        const portfolioValue = this.convertPortfolioToSymbolPrice(
          value['amount'],
          cryptoData.USD
        );
        this.setPortfolioValue(token, balance, portfolioValue);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async createLatestPortfoliosPerToken(): Promise<void> {
    const csvParser = await this.csvHandler.readCsvFile(this.filePath);
    for await (const data of csvParser) {
      const {token, amount, timestamp}: Transaction = data;
      if (
        !this.transactions[token] ||
        this.transactions[token].timestamp < timestamp
      ) {
        this.transactions[token] = {token, amount, timestamp};
      }
    }

    await this.retrievePortfolioValues();
  }

  async createPortfolioForTokenAndDate(
    providedToken: string,
    date: string
  ): Promise<void> {
    const csvParser = await this.csvHandler.readCsvFile(this.filePath);
    for await (const data of csvParser) {
      const {token, amount, timestamp}: Transaction = data;
      if (
        token === providedToken &&
        DateFormatter.dateMatched(date, timestamp) &&
        !this.transactions[token]
      ) {
        this.transactions[token] = {token, amount, timestamp};
      }
    }
    await this.retrievePortfolioValues();
  }

  async createLatestPortfolioForToken(providedToken: string): Promise<void> {
    const csvParser = await this.csvHandler.readCsvFile(this.filePath);
    console.log('token only');
  }

  async createPortfoliosPerTokenForDate(date: string): Promise<void> {
    const csvParser = await this.csvHandler.readCsvFile(this.filePath);
    console.log('date only');
  }
}
