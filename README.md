# VIT Faculties

###  Description:

A simple API that returns the list of faculties from the official VIT website. Currently only supports Chennai campus.

It uses web scraping to scrap the faculty list from the official site of VIT and stores the result in a JSON file. This process of scraping is done only when the application starts or once every x days`(default 7)` which can be customized by modifying the `routes/api.js` file and it saves the result to a JSON file`(routes/database/faculty.json)`. Every time a request is made to fetch the faculty list, it returns the saved info from the JSON file instead of scraping for every request. This reduces the response time by a LOT, from more than 2 seconds to a few milliseconds. This makes a big difference. 

It has a simple built-in authentication.

### How to Use:

1. Clone the repository using `git clone https://github.com/Rakeshkumar-7/vit_faculties.git`
2. Open the terminal in the project directory
3. Install the required modules before running using `npm install`
4. Run the program using `node main.js `
5. The program runs a local server at `http://localhost:3000` by default.
6. To get the faculty list, send a POST request to `http://localhost:3000/api/faculties` with the following body: 
   - "key": "542d3c6f-79cc-42f0-aa63-2b472bdaa9a1" `(default, can be changed on routes/database/APIkeys.json)`
   - "reason": "The reason for the request" `(can be any reason, just for logging purpose)`
7. You can send the POST request using Postman software or any other preferred way. The API returns a JSON response containing the faculties grouped by their school/division. It has the Name, Hierarchical position, Image URL of each faculty listed in the site
