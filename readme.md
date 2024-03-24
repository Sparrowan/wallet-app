# Wallet Management System API

Welcome to the documentation for the Wallet Management System API. This API facilitates the management of users' wallets, including functionalities such as creating wallets, listing transactions, crediting and debiting wallets, and viewing wallet details.

## Technical Documentation

For detailed technical documentation, please visit: [Wallet Management System Technical Documentation](https://wallet-app-sepia.vercel.app)

## Installation

To get started with the Wallet Management System API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sparrowan/wallet-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd wallet-app
   ```

3. Install dependencies using npm:
   ```bash
   npm install
   ```
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

## Usage

To start the development server, use the following command:
```bash
npm run dev
```

## Testing

To run tests, make sure you have Jest installed globally. If not, you can install it locally by running:
```bash
npm install --save-dev jest
```
Then, you can run tests using:
```bash
npx jest
```

## API Endpoints

- Create Wallet: [POST] https://wallet-app-sepia.vercel.app/api/wallet/create
- Debit Wallet: [PUT] https://wallet-app-sepia.vercel.app/api/wallet/{walletId}/debit
- Credit Wallet: [PUT] https://wallet-app-sepia.vercel.app/api/wallet/{walletId}/credit
- List Wallets: [GET] https://wallet-app-sepia.vercel.app/api/wallet/list
- List Transactions: [GET] https://wallet-app-sepia.vercel.app/api/transactions/list

## Technical Decisions

- Backend Framework: Node.js with Express.js and Typescript
- Database: MongoDB with Mongoose
- API Design: RESTful Architecture
- Validation: Yup Schema Validation
- Tests: Jest
- Doc Styling: Tailwind CSS
- Deployment: Vercel

## Preventing Exploits

To prevent financial exploits like race conditions, deadlocks, and unstable balances, the following measures have been implemented:

- MongoDB Transactions: Credit and debit operations are wrapped in MongoDB transactions to ensure atomicity.
- Optimistic Locking: A version field in the Wallet model is used for optimistic locking.

## Backend Architecture

The backend architecture of the Wallet Management System API includes details on routing, middleware, database schema, and data access logic.

## Conclusion

Thank you.
