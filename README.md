# Akua SDK for Node.js

## 📦 Installation

```bash
npm install akua-sdk
```

## 🚀 Getting Started

### 1. Initialize the client

```js
import { AkuaClient } from 'akua-sdk';

const client = new AkuaClient({
  clientId: process.env.AKUA_CLIENT_ID,
  clientSecret: process.env.AKUA_CLIENT_SECRET,
  environment: 'sandbox', // or 'production'
});
```

### 2. Use commands with `execute()`

```js
import { GetPaymentCommand } from 'akua-sdk';

const { data, error } = await client.execute(new GetPaymentCommand('abc123'));

if (error) {
  console.error('Failed to fetch payment:', error.message);
} else {
  console.log('Payment:', data);
}
```

## 🛡️ Error Handling

The SDK will never throw by default.  
Instead, the `execute()` method always returns a `{ data, error }` object.

You can access standardized error codes via:

```js
import { ApiErrorCodes } from 'akua-sdk';

if (error?.code === ApiErrorCodes.RATE_LIMIT) {
  console.warn('Too many requests. Please try again later.');
}
```

Or handle specific HTTP errors:

```js
import { AkuaError } from 'akua-sdk';

if (error instanceof AkuaError && error.status === 401) {
  console.error('Unauthorized: check your credentials.');
}
```