## Flatdango
Flatdango is a web application for managing and purchasing movie tickets at the DanHacks Movie Theater. Users can view movie details, check available tickets, purchase tickets, and explore the most popular movies.
## Features
1. Display Movies: View a list of available movies in the sidebar.
2. Movie Details: Displays details such as poster, runtime, showtime, and available tickets for the selected movie.
3. Purchase Tickets: Allows users to purchase tickets if they are available.
4. Highlight Top Movies: Showcases the most popular movies based on ticket sales.
5. Persistent Data: Uses localStorage for quick access to movie data.
## Technologies Used
1. HTML: For structuring the content of the application.
2. CSS: For styling and creating a visually appealing design.
3. JavaScript: For dynamic content rendering and interactivity.
4. JSON Server: To simulate a backend for storing movie data.
## Setup Instructions
## Prerequisites
1. Ensure you have the following installed on your machine:
        Node.js (for running JSON Server)
        A modern web browser (e.g., Chrome, Firefox)
## Installation
Clone this repository: 
## bash
git clone https://github.com/DanHacks/week-3-challange.git

cd movie-theater-system

## Install JSON Server:
## bash
npm install -g json-server

## Start the JSON Server:
## bash
json-server --watch db.json

Open index.html in your browser.

## Project Structure
## movie-theater-system/
├── index.html        # Main HTML file
├── style.css         # CSS file for styling
├── index.js          # JavaScript file for functionality
├── db.json           # JSON database for movie data
├── README.md         # Project documentation

## Usage
1. Run the project by opening the index.html file in a browser.
2. View the list of movies on the sidebar.
3. Click on a movie to view its details.
4. Purchase tickets using the Buy Ticket button (if available).
5. Check the Top Movies section for the most popular films.

## JSON Data Structure
The application uses a db.json file to simulate the backend. Here's a sample structure for movie data:

## json
{
  "films": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "runtime": 142,
      "capacity": 100,
      "tickets_sold": 80,
      "showtime": "7:00 PM",
      "poster": "link_to_image.jpg"
    },
    {
      "id": 2,
      "title": "The Godfather",
      "runtime": 175,
      "capacity": 120,
      "tickets_sold": 60,
      "showtime": "8:00 PM",
      "poster": "link_to_image.jpg"
    }
  ]
}
## Customization
1. To add new movies, update the db.json file under the films array.
2. Customize the app's design by editing the style.css file.
## License
This project is licensed under the MIT License. Feel free to use and modify it as you wish.

## Acknowledgments
1. Inspired by movie theater management systems.
2. Built using basic web technologies to simulate real-world applications.