🧠 Mini Local Business Dashboard
A full‑stack web app that lets small businesses preview simulated Google Business metrics and AI‑generated SEO headlines – inspired by a GrowthProAI use‑case.

📌 Objective
Build a Mini Local Business Dashboard with:

📊 Input form for business name & location

⭐ Simulated Google rating and reviews

🤖 AI‑style SEO headline generation + regeneration

All data is simulated; no database needed.

🛠 Tech Stack
Layer	Tools
Frontend	React, Tailwind CSS
Backend	Node.js, Express.js

📂 Project Structure
pgsql
Copy
Edit
mini-local-business-dashboard/
├── backend/
│   ├── index.js            # Express server & routes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   └── App.jsx         # Main dashboard
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md

🚀 Quick Start
1  Clone the repo
bash
Copy
Edit
git clone https://github.com/your-org/mini-local-business-dashboard.git
cd mini-local-business-dashboard
2  Start the backend
bash
Copy
Edit
cd backend
npm install
node index.js             # server runs at http://localhost:5000
3  Start the frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev               # Vite default: http://localhost:5173
Now open the frontend URL in your browser and start testing!

📡 API Endpoints
Method	Endpoint	Description
POST	/business-data	Returns rating, reviews & initial headline
GET	/regenerate-headline?name=&location=	Returns a fresh random headline

Example — POST /business-data
Request

json
Copy
Edit
{
  "name": "Cake & Co",
  "location": "Mumbai"
}
Response

json
Copy
Edit
{
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2025"
}
Example — GET /regenerate-headline
Response

json
Copy
Edit
{
  "headline": "Discover Why Mumbai Loves Cake & Co in 2025"
}
🖥️ Key Features
Responsive dashboard – mobile‑first design with Tailwind

Form validation – prevents empty submissions

Loading indicators – UX feedback during API calls

Headline regeneration – fetch a new SEO headline on demand

📨 Submission Checklist
Push all code (frontend & backend) to public GitHub

Ensure this README.md is present and up‑to‑date

(Optional) Deploy apps and add live links below

Email with subject:
Submission: Full Stack Intern Assignment [Your Name]


📃 License
Provided solely for educational and recruitment evaluation purposes.
