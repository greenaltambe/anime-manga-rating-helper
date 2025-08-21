# Anime/Manga Rating Helper

This is a simple, customizable web application to help you calculate a weighted average score for anime and manga. It allows you to rate different aspects of a series—such as **Story**, **Characters**, and **Animation Quality**—and assign a custom weight to each to get a final, objective score.

**Try here:** [Anime/Manga Rating Helper Live Demo](https://greenaltambe.github.io/anime-manga-rating-helper/)

---

### Features

* **Weighted Rating System:** Assign a specific weight to each rating point to reflect its importance to you.
* **Anime & Manga Modes:** Switch between predefined rating points and weights for anime and manga.
* **Descriptive Rating Scale:** A detailed guide explains what each numerical rating (from 1 to 10) means, providing a consistent framework for your evaluations.
* **Informative Descriptions:** Each rating point comes with a detailed description to help you understand its criteria.
* **Responsive Design:** The application is designed to work well on both desktop and mobile devices.

---

### How to Use

1.  **Select Type:** Choose "Anime" or "Manga" from the dropdown menu.
2.  **Rate Each Point:** For each category (e.g., Story, Characters), select a rating from the dropdown based on your evaluation. Hover over the label to see a detailed description of what that point entails.
3.  **Adjust Weight:** Change the weight of each category if you want to give more or less importance to certain aspects.
4.  **View Result:** The final weighted average score is automatically calculated and displayed at the bottom.

---

### Project Structure

* `index.html`: The main HTML file containing the structure of the application.
* `styles.css`: The CSS file for styling the user interface.
* `script.js`: The JavaScript file that handles all the logic, including calculations, dynamic content rendering, and event listeners.
* `manifest.json`: A manifest file for the Progressive Web App (PWA), allowing it to be installed on devices.
* `service-worker.js`: A service worker for PWA functionality, enabling offline access and caching.
