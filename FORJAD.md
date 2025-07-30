# HSMS Project Documentation

## Introduction

This document provides a comprehensive overview of the Health Services Management System (HSMS) project. It is intended to serve as a guide for understanding the project's architecture, features, and future development path.

## System Architecture

The HSMS is a frontend-only application built with **React** and styled with **Tailwind CSS**. It is designed to be a single-page application (SPA) that can be easily integrated with a backend API in the future.

### Frontend

The frontend is responsible for rendering the user interface and handling all user interactions. It is built with the following technologies:

-   **React:** A JavaScript library for building user interfaces.
-   **Tailwind CSS:** A utility-first CSS framework for styling.
-   **React Router:** A library for handling routing in a React application.
-   **React Context:** A feature for managing state in a React application.

### Backend

Currently, the project does not have a backend. All data is mocked and stored in the `src/data/mockData.ts` file. This allows for rapid development and testing of the frontend without the need for a database or server.

## Codebase Overview

### Folder Structure

The project is organized into the following folders:

-   `src/assets`: Contains static assets such as images and icons.
-   `src/components`: Contains reusable UI components.
    -   `src/components/layout`: Contains the main layout components, such as the header and sidebar.
    -   `src/components/ui`: Contains the basic UI components, such as buttons, inputs, and cards.
-   `src/contexts`: Contains the React Context providers. The `AuthContext` is used to manage the user's authentication state.
-   `src/data`: Contains the mock data for the application.
-   `src/hooks`: Contains custom React hooks.
-   `src/pages`: Contains the main pages of the application. Each page is a separate file.
-   `src/lib`: Contains utility functions.

### User Roles and Feature Implementation

The application supports three user roles: Nurse, Doctor, and Student/Patient. The code for each role is primarily located in the `src/pages` directory.

-   **Nurse:** The Nurse has access to most of the application's features. The code for the Nurse's dashboard, patient records, appointments, stocks, history, and reports can be found in the corresponding files in the `src/pages` directory.
-   **Doctor:** The Doctor has a more limited set of features. The code for the Doctor's dashboard, prescriptions, and chat can be found in the corresponding files in the `src/pages` directory. The Doctor can also edit the Doctor's Notes in the `PatientProfile` component.
-   **Student/Patient:** The Student/Patient has the most limited set of features. They are redirected to a dedicated landing page after logging in. The code for the patient landing page, appointment booking form, and read-only patient profile can be found in the corresponding files in the `src/pages` directory.

### Authentication and Authorization

Authentication is handled by the `AuthContext`. When a user logs in, their information is stored in local storage, so they will remain logged in even if they refresh the page.

Authorization is handled by the `withAuthorization` higher-order component (HOC). This HOC wraps each page and checks if the user has the required role to access the page. If the user is not authorized, they are redirected to an "Unauthorized" page or the patient landing page, depending on their role.

## Future Backend Integration (Laravel)

To integrate the application with a Laravel backend, the following steps should be taken:

1.  **Set up the Laravel Backend:** Create a new Laravel project and set up a database.
2.  **Create API Endpoints:** Create API endpoints for all the data that the frontend needs. This will involve creating controllers, models, and routes for each resource (e.g., patients, appointments, etc.).
3.  **Replace Mock Data with API Calls:** In each of the page components, replace the mock data with API calls to the Laravel backend. The `fetch` API or a library like `axios` can be used to make these calls.
4.  **Handle Loading and Error States:** Add loading and error states to the components to provide feedback to the user while the data is being fetched.
5.  **Implement User Authentication:** Replace the mock authentication with a proper authentication system. This will involve creating a login and registration system in the Laravel backend and using a token-based authentication system (e.g., JWT) to authenticate users on the frontend.
