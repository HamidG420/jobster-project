# Jobster

## Project in Action

[Jobster](https://jobster-app-project.netlify.app)

## Introduction

Jobster's main idea is to streamline your job search and application process. With Jobster, you can effortlessly keep track of all your job applications, interviews, stats, etc. in one centralized platform.
All features are accessible via a dashboard panel.

- In Jobster, you can add a job based on position name, company, job location, status, and job type (full-time, part-time, etc.).
  Jobs have three statuses:

  - pending
  - interview
  - declined

- In the All Jobs page, you can view all of the jobs that you created and track them from a holistic viewpoint. You can filter them based on the mentioned attributes in the job creation feature to view a subset of jobs you applied for.
- The stats page shows you a general report about your job-hunting process with stats and charts.
- Last but not least, there is a basic profile management where you can edit your name, location, and email.

## Tools & Technologies

For the development of this project, these tools/technologies/libraries are used:

- HTML
- CSS
- JavaScript
- React.js (Create-React-App Boilerplate)
- Axios
- Redux & Redux Toolkit
- React Router
- Styled Components
- React Icons
- React Toastify
- Recharts
- DayJS
- Normalize CSS
- Framer Motion

## Installation & Run The App Locally

To install all dependencies you should run the `npm install` command in your terminal.

To run and view this app, you should run the `npm run` command in your terminal.

You can use the command down below to perform both commands at the same time.

```sh
npm run install && npm start
```

Visit url [http://localhost:3000/] to interact with the app.

## Notes

- Everything is styled with vanilla css and styled-components. For icons, react-icons library is used. For the bar chart and area chart in stats page recharts is used.

- For state management redux toolkit is used. The store consists of three slices:

  1. User slice
  2. Job slice
  3. AllJobs slice

- It's a front-end project. I didn't develop the back-end and have no information about the implementation of it.

- This is just a demo project for educational purposes and heavily based on [React 18 Tutorial and Projects Udemy Course](https://www.udemy.com/course/react-tutorial-and-projects-course/?referralCode=FEE6A921AF07E2563CEF) Jobster project. You can visit the Github repository of the original project in [here](https://github.com/john-smilga/redux-toolkit-jobster).
