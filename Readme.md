# AlgoLab

AlgoLab is a LeetCode-like problem-solving platform featuring user authentication, problem management, and code execution with Judge0 integration. Deployable on AWS with self-hosted or managed Judge0 support.

## Features

- User authentication (sign up, login, logout)
- Problem management (CRUD for coding problems)
- Code editor with real-time code execution
- Judge0 integration for code judging
- Submission history and leaderboard
- AWS-ready deployment

## Tech Stack

- **Frontend:** React.js / Next.js
- **Backend:** Node.js / Express.js
- **Database:** MongoDB / PostgreSQL
- **Code Execution:** Judge0 (self-hosted or managed)
- **Deployment:** AWS (EC2, S3, RDS, etc.)

## Getting Started

### Prerequisites

- Node.js & npm
- Docker (for Judge0)
- AWS account (for deployment)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/algolab.git
    cd algolab
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` and update values.

4. **Run Judge0 (locally):**
    ```bash
    docker run -d -p 2358:2358 judge0/judge0
    ```

5. **Start the application:**
    ```bash
    npm run dev
    ```

## Deployment

- Use AWS EC2 for backend/frontend hosting.
- Use AWS RDS for database.
- Optionally, deploy Judge0 on EC2 or use Judge0 SaaS.

## Contributing

Contributions are welcome! Please open issues and submit pull requests.

## License

MIT License

---

**Note:** Replace placeholders and update instructions as per your actual implementation.