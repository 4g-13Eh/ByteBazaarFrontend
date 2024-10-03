# ByteBazaarFrontend

This is the frontend of the ByteBazaar application, which allows users to browse items, add items to their cart, update item quantities, view their cart contents and check their items out. It communicates with the backend API to retrieve data and handle user actions. The application was built using Angular, Angular Material, Bootstrap and TailwindCSS.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Further Help](#further-help)
- [License](#License)

## Prerequisites
Before you can run or build the frontend application, make sure you have the following installed on your machine:
- Node.js (version 20 or higher)
- npm (version 10 or higher)
- Angular (version 17)

## Getting Started
To get started with this project, you'll need to clone the repository and navigate to the project folder.
```bash
git clone https://github.com/4g-13Eh/ByteBazaarFrontend.git
cd bytebazaarfrontend
````
Before running the application, install the required dependencies using `npm`
```bash
npm install
```

## Running the application
To run the development server locally, use the following command:
````bash
ng serve
````
Once the server is running, navigate to http://localhost:4200 in your browser. The application will automatically reload if you make any changes to the source files.

### Running with Proxy
By default, the application uses the [`proxy.conf.json`](./src/proxy.conf.json) file to set a proxy when starting. If your backend API is running on a port other than 8080, adjust the file accordingly.

## Building the Application
To build the project for production, run:
```bash
ng build
```
The build artifacts will be stored in the dist/ directory. The build command compiles the application into static files optimized for deployment.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
