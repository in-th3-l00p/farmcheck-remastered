# FarmCheck

FarmCheck is a platform aimed at addressing communication issues within agricultural fields, as well as monitoring and automating the maintenance process. Within the FarmCheck project, users have access to index their farm personnel and organize their tasks through the chat system or task management.

To monitor an agricultural field, we offer an IoT solution through a sensor that sends real-time data such as soil and air temperature and humidity, which is displayed on the platform's application.

Thanks to its intuitive interface, our target audience is anyone who owns agricultural land and wishes to benefit from our functionalities and solutions for managing it.

Furthermore, FarmCheck becomes a significant aid for someone new to agriculture, as we provide general information as well as specific details about cultivating 40 different plants.

FarmCheck represents an innovation in agricultural digitization, as no one has developed a product with such a low cost yet with such great utility, and an application that can be used by anyone.

## Features
-   Connecting to a sensor and receiving real-time data
-   Managing farm employees
-   Assigning tasks to employees
-   Chat rooms within a farm
-   "CropWiki" page, where we provide information about a variety of plants

## How to install the sensor of a farm
First, you will need to create a new farm sensor where you intend to install the sensor. Once created in the database, you will receive an access code.

Once opened, if the product is not connected, it will open an access point. Once connected to the access point, you will be redirected to a web page where you will need to connect the sensor to a WiFi network and enter the code generated earlier. Once you submit the form, the sensor will start sending data.

## Used Technologies

-   **Backend**: Spring Boot, chosen for its ease of integrating with the latest technologies, such as WebSockets.
-   **Database**:
    -  PostgreSQL - utilized for persisting critical data like user information. This relational database is one of the most popular choices for data persistence, holding the title of "the most advanced database."
	-  Redis - used for storing data that requires higher volume persistence but has lower importance. Redis offers a faster way of saving data using hashes, making it the optimal choice for storing data received from the sensor or messages from chat rooms.
-   **Frontend**: React Native, written in TypeScript, for mobile application development. This framework provides a scalable way to develop cross-platform applications (Android & iOS) for smartphones.
-   **Arduino IDE**: A secure, stable, and intuitive environment for developing code deployed on the ESP32 microcontroller of the sensor.

## Personal Experience with this Project

My father needed a way to remotely manage his agricultural land. As a result, he tried out the FarmCheck project, installing a sensor and viewing the information sent directly from home, while the field was located about 20 kilometers away from our house. This experience instilled in me the confidence to consider the project a true innovation, as he told me how easy it was to use and how valuable it proved to be.
