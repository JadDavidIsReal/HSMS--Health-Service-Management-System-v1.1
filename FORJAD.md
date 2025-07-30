# FORJAD's Guide to the HSMS Project

Yo, future me, or whoever is reading this. Here's a chill guide to understanding this project. No jargon, just the straight dope.

## What is this thing?

It's a **Health Services Management System (HSMS)**. Think of it as the app the nurse at your school clinic uses to keep track of patients, appointments, and all that jazz. It's built with **React** (a popular JavaScript library for building user interfaces) and **Tailwind CSS** (a utility-first CSS framework for styling).

## Where's the "Backend"?

Right now, there isn't a real backend. All the data you see is **mock data**, which is just a fancy way of saying it's fake data that's hardcoded into the project. This is so we can build and test the frontend without needing a database or a server.

You can find all the mock data in the `src/data/mockData.ts` file. This file contains arrays of objects for patients, appointments, prescriptions, etc.

## How to Remove the Mock Data and Use a Real Backend (like Laravel)

When you're ready to use a real backend, you'll need to do a few things:

1.  **Set up your Laravel backend:** This will involve creating a database and building an API that the frontend can talk to. Your API will have endpoints for getting, creating, updating, and deleting data (e.g., `/api/patients`, `/api/appointments`, etc.).

2.  **Replace the mock data with API calls:** In each of the page components (e.g., `src/pages/Patients.tsx`, `src/pages/Appointments.tsx`), you'll need to replace the mock data with API calls to your Laravel backend. You can use the `fetch` API or a library like `axios` to make these calls.

    For example, instead of this:

    ```javascript
    import { mockPatients } from '../data/mockData';

    const [patients, setPatients] = useState(mockPatients);
    ```

    You would do something like this:

    ```javascript
    import { useState, useEffect } from 'react';

    const [patients, setPatients] = useState([]);

    useEffect(() => {
      fetch('/api/patients')
        .then(response => response.json())
        .then(data => setPatients(data));
    }, []);
    ```

3.  **Update the components to handle loading and error states:** Since you'll be fetching data from a server, you'll need to add loading and error states to your components. This will let the user know that something is happening and handle any errors that might occur.

## Where to Find Everything

Here's a quick rundown of the project structure:

-   `src/components`: This is where all the reusable UI components live.
    -   `src/components/layout`: This is where the main layout components are, like the header and sidebar.
    -   `src/components/ui`: This is where the basic UI components are, like buttons, inputs, and cards.
-   `src/contexts`: This is where the React Context providers are. We use a context to manage the user's authentication state.
-   `src/data`: This is where the mock data is.
-   `src/hooks`: This is where any custom React hooks are.
-   `src/pages`: This is where all the main pages of the application are. Each page is a separate file.
-   `src/lib`: This is where any utility functions are.

## The Important Stuff

-   **Authentication:** The authentication is handled by the `AuthContext`. When a user logs in, their information is stored in local storage, so they'll stay logged in even if they refresh the page.
-   **Routing:** The routing is handled by `react-router-dom`. All the routes are defined in the `src/App.tsx` file.
-   **Styling:** The styling is done with Tailwind CSS. You can find all the color definitions in the `src/index.css` file.

That's the gist of it. If you have any questions, just read the code. It's pretty straightforward. Peace out. ✌️
