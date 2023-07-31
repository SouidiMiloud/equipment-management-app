
import arduino from "../images/arduino.jpg";
import raspberry from "../images/raspberry.jpeg";
import breadboard from "../images/breadboard.jpg";
import utrason from "../images/utrason.jpeg";
import ESP8266 from "../images/ESP8266.png";
import ESP32 from "../images/ESP32.jpg";
import STM32 from "../images/STM32.png";
import PIC from "../images/PIC microcontrollers.png";
import ram from "../images/ram.jpg";
import capteurtemperature from "../images/capteurtemperature.jpg";
import LightSensor from "../images/LightSensor.png";




const products = [
            {
                id: 1,
                imageUrl: arduino,
                name: "Arduino Uno",
                description: "Lorem ipsum is placeholder text commonly used",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 2,
                imageUrl: raspberry,
                name: "Raspberry Pi Pico",
                description: "Lorem ipsum is placeholder text commonly used ",
                category: "microcontroller",
                quantity: 0
            },
            {
                id: 3,
                imageUrl: capteurtemperature,
                name: "Temperature Sensor",
                description: "Temperature Sensor measures the temperature of its surroundings.",
                category: "Sensor",
                quantity: 1
                
            },
            {
                id: 4,
                imageUrl: utrason,
                name: "Product 4",
                description: "Lorem ipsum is placeholder text commonly us",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 5,
                imageUrl: ESP8266,
                name: "ESP8266",
                description: "Lorem ipsum is placeholder text commonly us",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 6,
                imageUrl: ESP32,
                name: "ESP32",
                description: "Lorem ipsum is placeholder text commonly us",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 7,
                imageUrl: STM32,
                name: "STM32",
                description: "Lorem ipsum is placeholder text commonly us",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 8,
                imageUrl: PIC ,
                name: "PIC microcontrollers ",
                description: "Lorem ipsum is placeholder text commonly us",
                category: "microcontroller",
                quantity: 1
            },
            {
                id: 9,
                imageUrl: LightSensor,
                name: "Light Sensor (Photoresistor/Photocell)",
                description: "Light Sensor measures the intensity of light.",
                category: "Sensor",
                quantity: 1
            },
            {
                id: 10,
                imageUrl: ram,
                name: "Random Access Memory (RAM)",
                description: "Random Access Memory (RAM) is a type of computer memory that allows data to be accessed quickly.",
                category: "Memory",
                quantity: 1
            }, {
                id: 12,
                imageUrl: breadboard,
                name: "Product 3",
                description: "Lorem ipsum is placeholder text commonly used ",
                category: "microcontroller",
                quantity: 1
                
            },
            
            

        ];


export default products;