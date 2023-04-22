# propine-task

## Introduction

This command line program does the following from logs in a `csv` file:

1. Given no parameters, return the latest portfolio value per token in USD
2. Given a token, return the latest portfolio value for that token in USD
3. Given a date, return the portfolio value per token in USD on that date
4. Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns:

`timestamp`: Integer number of seconds since the Epoch

`transaction_type`: Either a DEPOSIT or a WITHDRAWAL

`token`: The token symbol

`amount`: The amount transacted

## Installation

Run following commands:

- `npm i`
- `npm run compile`
- Due to large CSV file size, the file is not included.
- Add the `transactions.csv` in `data` folder.

## CLI usage instructions

To use the command line interface, follow:

- Run: `node ./build/src/index.js portfolio --help` from project root in a terminal.

It will display following:

```sh
Usage: node ./build/src/index.js portfolio [options]

Options:
  --token <string>  specify token
  --date <string>   specify date
  -h, --help        display help for command
```

Following are some responses generated for the four actions of this CLI mentioned above:

Command:

```sh
node ./build/src/index.js portfolio
```

Response:

```json
[
    { balance: '0.541551 BTC', portfolioValue: '14812.524614040001 USD' },
    { balance: '0.267882 ETH', portfolioValue: '497.65242786000005 USD' },
    { balance: '0.231365 XRP', portfolioValue: '0.104669526 USD' }
]
```

Command:

```sh
node ./build/src/index.js portfolio --token=BTC --date=1970-01-19
```

Response:

```json
[
  { balance: '0.298660 BTC', portfolioValue: '8165.367386599999 USD' }
]
```

Command:

```sh
node ./build/src/index.js portfolio --token=ETH
```

Response:

```json
[ { balance: '0.267882 ETH', portfolioValue: '497.15148852 USD' } ]
```

Command:

```sh
node ./build/src/index.js portfolio --date=1970-01-19
```

Response:

```json
[
  { balance: '0.298660 BTC', portfolioValue: '8165.800443599999 USD' },
  { balance: '0.693272 XRP', portfolioValue: '0.3132202896 USD' }
]
```
