# Getting Started with Pokemon App

## Step 1: Set Proper Credentials

In both the `backend` and `frontend` folders, create a `.env` file and set the necessary credentials.

## Step 2: Backend Setup

1. Go inside the `backend` directory using the terminal:
    ```
    cd backend
    ```

2. Build the production version of the backend:
    ```
    npm run build:prod
    ```

3. Generate and save keys in the `keys` directory:
    ```
    npm run prod:keys
    ```

4. Upload the Pokemon data to the database:
    ```
    npm run prod:upload-pokemon
    ```

5. Start the backend server:
    ```
    npm start
    ```

## Step 3: Frontend Setup

1. Go inside the `frontend` directory using the terminal:
    ```
    cd frontend
    ```

2. Start the frontend development server:
    ```
    npm start
    ```

Now you should have both the backend and frontend running, and you can access the Pokemon app in your browser.
