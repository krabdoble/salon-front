Reservation Application

Project Overview

The Reservation Application is a web-based platform designed to manage event hall reservations efficiently. It allows users to register and log in using Firebase authentication, manage halls, create and list reservations, and visualize bookings in a calendar format. The app also includes filtering options, notifications, and statistical reports.

Features

Authentication

Login with Firebase authentication.

Event Hall Management

Add and manage event halls for reservations.

Reservation Management

View reservations in a card-based format, displaying:

User's photo

Name

Reservation date

Event hall

Filter reservations by event hall, date, and user.

Create new reservations specifying start and end date/time.

Calendar View

Display all reservations using FullCalendar.

Edit reservations directly from the calendar.

Prevent overlapping reservations or new reservations within 1 hour after an existing one.

Notifications

Notify users of their reservations one day before via email.

Implemented using Nodemailer for sending emails and node-cron for scheduling tasks.

User Dashboard

Display a list of past reservations in the user's detail page.

Statistics & Analytics

Generate and display graphical reports of reservations per day and per hall.

Tech Stack

Frontend: React, FullCalendar, Firebase Authentication

Backend: Node.js, Express.js

Database: MongoDB / Firebase Firestore

Notifications: Nodemailer, Node-Cron

Contact

For any inquiries, feel free to contact patricelamarre@yahoo.fr or patricelmrr@gmail.com.