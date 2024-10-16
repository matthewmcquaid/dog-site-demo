
# Title

Test Server Example with DB

# Installation

- Designed for NodeJS v20.16.0 and npm v10.8.1
- nvm instructions <https://github.com/nvm-sh/nvm>

# Set Up PostgreSQL

Create a PostgreSQL database:

```bash
createdb dogs
```

1. Connect to the database:

    ```bash
    psql -d dogs
    ```

2. Create a table:

    ```bash
    CREATE TABLE our_dogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT
    );
    ```

3. Update .env file with DB settings

# Starup

```bash
cd ~/server
npm i
npm start
```

# Test Coverage

```bash
cd ~/server
npm run coverage
```
