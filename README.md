

# TriTours

TriTours allows users tracks their footsteps into every city they can think of. Never forget their wonderful experiences, and show their friends how they have wandered the world. It uses React, Supabase, and Leaflet to provide the full stack application.

## Technologies Used

- React - Frontend framework for building UI and managing state
- JavaScript - Programming language for application logic  
- HTML - Markup language for content
- CSS - Styling language for visual design
- Supabase - Backend database and authentication
- Leaflet API - Map interface and functionality

## Homepage

The homepage provides a brief overview of the app's purpose and prompts users to log in or sign up. It features:

- Hero text explaining the app's purpose  
- Call to action button to navigate to the login or app screen
- Built with React components

## Login

The login screen allows users to sign in with email and password. Key details:

- Form with email, password, and submit button
- Form values stored in React state
- Calls Supabase auth API to login on form submit
- Navigates to app screen on successful login  
- Displays error message on failure
- Demo account details provided

## Signup 

Similar to login, the sign up screen allows creating a new account.

- Form with name, email, password and submit button
- Inserts user data into Supabase profiles table after auth signup
- Navigates to app screen on success

## Pricing

A simple pricing page with mock content. Gives an example of additional pages that could be added.

## App Screen

The main application screen handles the map and pins.

- Uses LeafletJS to display the interactive map
- Renders pins passed from Supabase database  
- Handles user location access
- Provides UI to create new pins
- Manages state and data flow with React

##[Click here to Check it Out](https://tritours.netlify.app/)


