# VIT Faculties

###  Description:

A simple API that returns the list of faculties from the official VIT website. Currently only supports Chennai campus

It uses web scraping to scrap the faculty list on the official site of VIT and stores the result in a JSON file. This process of scraping is done only when the application starts or every 7 days (Can be customized by modifying the routes/api.js file). Every time some tries to fetch the faculty list, it returns the info in the JSON file instead of scraping for every request. This reduces the response time by a LOT. 

It has a simple built-in authentication.

### How to Use:

1. Clone the repository using git
2. Install the required modules before running using `npm install` in the directory of this project
3. Run the program using `node main.js `
4. The program runs a local server at `http://localhost:3000` by default.
5. To get the faculty list, send a POST request to `http://localhost:3000/api/faculties` with the following body: 
   - "key": "542d3c6f-79cc-42f0-aa63-2b472bdaa9a1" `(default)`
   - "reason": "The reason for the request. Can be any reason. Just for logging purpose"
6. You can send the POST request using Postman software or any other way. The API returns a JSON object containing the faculties grouped by their school/division. It has the name, position, image_url of each faculty listed in the site

