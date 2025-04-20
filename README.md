# NGO Report App

- A simple full-stack web application that enables NGOs to submit their monthly activity reports and provides a dashboard for administrators to view aggregated impact data.

# 🔧 Tech Stack

## Frontend: Next.js (App Router), Tailwind CSS

## Backend: API Routes in Next.js

## Database: MongoDB

## Deployment: Vercel

# ✨ Features

- NGO Report Submission
- NGOs can submit monthly reports including:
- NGO ID
- Month
- People Helped
- Events Conducted
- Funds Utilized
- Admin Dashboard

# View summarized data across all NGOs for a selected month:

- Total NGOs reported
- Total People Helped
- Total Events Conducted
- Total Funds Utilized

## Bonus Features

- Loading and empty states for better UX

- Form validation with error handling and success messages


# 🚀 Deployment

- This app is deployed using Vercel:

✅ Live App: https://ngo-report-app.vercel.app

- Make sure to set the following environment variable in Vercel:

- MONGODB_URI – your MongoDB connection string

# 🛠️ Running Locally

  1. Clone the repository:
  ``` bash
    git clone https://github.com/Jash728/NGO-Report-App.git

  2. Install dependencies:
  ``` bash
    npm install

Add a .env.local file:

MONGODB_URI=your_mongodb_connection_string

Run the dev server:

npm run dev
