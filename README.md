# Netflix Clone 

Hello! This is a clone of the Netflix website that I built while following a tutorial by Sonny Sangha 😁

App Link: https://netflixclone-ad599.web.app

## Features

* Start Page that instructs users to create a new (fake) account
* Ability to create new accounts
* Once logged in, users can "subscribe" to selected plans
* Credit card info can be input and actual payments go through stripe
* When loged in, users can view home page and selection of movies
* All movvie posters taken from TMDB (The Movie Data Base) API

## Architecture
This app was built with React.JS, HTML, CSS, Firebase v9, Next Auth, Redux, TMDB API, and hosted/deployed with Firebase deploy. This app is a fully funtional React app built on the concept of "components". All part of the app are broken up in to components (Banner, Navigation, Home Screen, Login Screen, Plan Screen, Profile Screen, Sign Up Screen) and thus can be reused as necessary. 

Redux is also used to track the "state" of the user's login status and thus allow certain permissions only allowed to users with accounts. 

Lastly, the payments and back end are all handled by Firebase Extentions that connect to stripe payment. Thus all data is stored on Firebase v9, from user information, user subscriptions status, and "plan" selection.

## Screenshots
### Start Page
![Screen Shot 2022-08-28 at 12 50 39 AM](https://user-images.githubusercontent.com/99083937/187058586-ff9017d0-6611-423b-9bf8-a9bf1fee513e.png)
Start Page that greets users before login

## Login Page 
![Screen Shot 2022-08-28 at 1 12 13 AM](https://user-images.githubusercontent.com/99083937/187058626-14f880d9-84b6-471e-b40b-dbaade588d53.png)
Login Page that allows users to sign up or sign in

## Plans Page
![Screen Shot 2022-08-28 at 1 13 36 AM](https://user-images.githubusercontent.com/99083937/187058668-f841bdb3-4c5f-40ce-aa64-12e3f309fdd9.png)
Plans page that shows available plans and rates

## Payment Page
![Screen Shot 2022-08-28 at 1 14 58 AM](https://user-images.githubusercontent.com/99083937/187058701-ab9f486a-c5fd-43d9-8711-e6863ec1b7de.png)
Payment Page that is connected to stripe and allows users to pay for subscriptions

## Home Page
![Screen Shot 2022-08-28 at 1 16 48 AM](https://user-images.githubusercontent.com/99083937/187058757-60f08282-d4ef-4397-ab18-ecd470a987b6.png)
Home Page after user has subscribed

## Thank you

If you would like to use/test the app feel free to follow the link above and either make your own fake account or use these credentials:

    email: daniel@gmail.com
    password: 123456789

If you would like to test the stripe payment please use this FAKE tester credit card:

    4242 4242 4242 4242
    04/24
    424

Video Tutorial Link: https://www.youtube.com/watch?v=CLMo0W7mTVo
