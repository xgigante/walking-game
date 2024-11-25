# Walking Game

## Project Description

Walking Game is an interactive game developed with **Next.js** for the frontend and a backend built using **.NET C# 6**. The backend provides a REST API to handle the game’s logic and data, enabling seamless communication between both components.

---

## Installation and Execution

### 1. Prerequisites

Ensure you have the following tools installed:

#### Frontend

- **Node.js** (v16 or later)
- **npm** (v7 or later)

#### Backend

- **.NET 6 SDK**: Download it from [https://dotnet.microsoft.com/download/dotnet/6.0](https://dotnet.microsoft.com/download/dotnet/6.0).

### 2. Clone the Project Repositories

Clone both the frontend and backend repositories to your local machine.

#### Frontend:

```bash
git clone <repository-url>
cd walking-game
```

#### Backend:

```bash
git clone https://github.com/fravalpin/Walking-Game.git
cd Walking-Game/WalkGameService
```

---

## Running the Backend

1. **Install .NET 6 SDK**  
   Ensure the SDK is installed correctly by checking its version with:

   ```bash
   dotnet --version
   ```

2. **Run the Backend**  
   Navigate to the `WalkGameService` folder and execute the following command:

   ```bash
   dotnet run
   ```

   This will start the backend server. By default, it will be available at:  
   [https://localhost:7277](https://localhost:7277).

3. **Verify the API**  
   Open [https://localhost:7277/swagger/index.html](https://localhost:7277/swagger/index.html) in your browser to confirm the backend is running and explore the available endpoints.

---

## Running the Frontend

1. **Install Dependencies**  
   Navigate to the frontend directory (`walking-game-1`) and run:

   ```bash
   npm install
   ```

2. **Configure the Backend URL**  
   Create a `.env` file in the root of the frontend project and add the following global variable:

   ```env
   NEXT_PUBLIC_API_BASE_URL='https://localhost:7277/'
   ```

   This configuration ensures the frontend communicates with the local backend.

3. **Run the Frontend Development Server**  
   Start the frontend server with:

   ```bash
   npm run dev
   ```

   By default, it will be available at:  
   [http://localhost:3000](http://localhost:3000).

---

## Technologies Used

### Frontend

- **Next.js**: Framework based on React for building web applications.
- **Redux Toolkit**: For global state management.
- **Axios**: HTTP client for interacting with the backend API.
- **TailwindCSS**: Utility-first CSS framework for fast and efficient styling.

### Backend

- **.NET 6**: Framework used to build web applications and services.
- **Swagger**: Tool for documenting and interactively testing the API.

---

## Connecting Frontend and Backend

Make sure that:

1. The backend is running properly before starting the frontend.
2. The backend URL is correctly set in the `.env` file of the frontend.
3. Use your browser to test the complete functionality of the application.

---
