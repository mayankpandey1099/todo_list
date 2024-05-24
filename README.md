# To-Do List Application

This is a simple To-Do List application built with React and Express.js. It features user authentication, task management with mark as done functionality, and the ability to share tasks with other users. The application demonstrates basic CRUD operations, user session handling, and notification mechanisms.

## Features

- User Authentication
- Add, Edit, and Delete To-Do Tasks
- Mark Tasks as Done
- Share Tasks with Other Users
- Notification System for Shared Tasks
- nodemailer authentication message to email id

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mayankpandey1099/todo_list.git
    cd todo-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Install Axios:

    ```bash
    npm install axios
    ```

4. (Optional) Install additional dependencies if needed:

    ```bash
    npm install express cors body-parser
    ```
5. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USER_EMAIL=user@example.com
```
### Running the Application

1. Start the backend server:

    ```bash
    node server.js
    ```

2. Start the React application:

    ```bash
    npm start
    ```






