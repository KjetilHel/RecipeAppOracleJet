# Recipe App
## Introduction
This is a simple app developed during a 48-hour hackathon for the course IMT2581 Rapid Prototyping that is held at NTNU in Gjøvik. I (Kjetil Helgås) am the only developer that has contributed to this project, which is the reason there is only one major commit. The framework that has been used is Oracle Jet and the application is mainly ment for mobile devices. The app is a recipe app where users can add food recipes and there is also a diary-functionality where the users can add what recipe they made for a specific date.
  
## How to run
There are two necessary modules that has to be installed from your command line  
Oracle jets main module:  
`npm install -g @oracle/ojet-cli`  
Cordova which allows for mobile compilation:  
`npm install -g cordova`  
  
After installing the modules and cloning the repository, navigate to the main folder of the project and run any of the following commands:  
For compiling the app in a browser:  
`ojet serve android --browser`  
For compiling on a USB connected device (with USB debugging enabled):  
`ojet serve android --destination=device`  
For compiling on a running emulator (I've only tested the emulator from Android Studio):  
`ojet serve android`  

