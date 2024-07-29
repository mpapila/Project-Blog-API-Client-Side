# Blog Application Frontend

This is the frontend application for a blog platform built with React, TypeScript, and Material-UI. The application allows users to create, view, and comment on blog posts.

## Live Site
[Visit the live site here](https://project-blog-api-client-side.netlify.app/)

## Backend
The backend for this project can be found at: [Project Blog API Server-Side](https://github.com/mpapila/Project-Blog-API-Server-Side)

## Dependencies
- React
- TypeScript
- Material-UI
- React Router
- TinyMCE (for rich text editor)

## Features
- User authentication (Login and Signup)
- Create new blog posts with a rich text editor
- View a list of blog posts
- View detailed information for each post along with comments
- Responsive and user-friendly interface
- Floating action button for quick access to the new post creation page

## Pages
- **Home**: Displays a list of all blog posts.
- **Login**: Allows users to log in to their account.
- **Signup**: Allows new users to create an account.
- **PostDetail**: Displays detailed information about a single post, including comments.
- **NewPost**: Allows authenticated users to create a new post.

## Components
- **Navbar**: Navigation bar with login/logout functionality.
- **Footer**: Basic footer for the application.
- **Loading**: Indicates loading state during data fetch.
- **FloatingAddButton**: Floating action button to navigate to the new post creation page.


## Project Structure
- `src/components`: Contains reusable components like `FloatingAddButton`, `Loading`, and `Navbar`.
- `src/pages`: Contains page components like `Home`, `Login`, `Signup`, `PostDetail`, and `NewPost`.
- `src/App.tsx`: Main application component with routing setup.
- `src/Router.tsx`: Defines the routes for the application.
- `src/index.tsx`: Entry point of the application.
- `src/type.ts`: Contains TypeScript types used in the application.

## Author
- Mehmet Papila © 2024 Mehmet Papila. All rights reserved.
