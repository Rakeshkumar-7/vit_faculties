const axios = require('axios'); // To make GET request
const https = require('https'); // To be used as https agent
const cheerio = require('cheerio'); // To structure and access the raw HTML from scraping
const fs = require('fs');



// Function to scrap the faculties from the official site. Returns after the scraping finishes
async function fetchFaculties(schools, baseURL, scrap = false){
    if(scrap == true){
        let faculties = {}
        console.log('Fetching faculty list...');
        for(const [school, code] of Object.entries(schools)){
            let link = baseURL + code + '/faculty';
            let departmentList = [];
            
            // SAS has different faculty suburl for different divisions
            if(school.startsWith("sas_")){
                link = baseURL + code[0] + '/' + code[1] + 'faculty';
            }
        
            try {
                // Using https as httpsAgent to ignore certificate errors
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                let res = await axios.get(link, {httpsAgent: agent});
                const rawHTML = res.data;
                const $ = cheerio.load(rawHTML);
                /*
                HTML STRUCTURE OF VIT, Chennai website (as of Feb, 2021)
                # Faculty Card:
                .vc_column-inner > .wpb_wrapper > .row > .member-item > .member-item-inner > OPTIONS
    
                OPTIONS:
                .item-thumbnail > img[src] // Image
                .item-content >.item-title // Name
                .item-content > .small-text // Hierarchy
                */
                const cards = $('.vc_column-inner > .wpb_wrapper > .row > .member-item > .member-item-inner');
                cards.each((i, card) => {
                    const name = $(card).find('.item-content >.item-title').text().replace(/[\t\n\r]/gm,'');
                    const hierarchy = $(card).find('.item-content >.small-text').text().replace(/[\t\n\r]/gm,'');
                    const thumbnail = $(card).find('.item-thumbnail > img').attr('src');
                    departmentList.push({
                        "name": name,
                        "hierarchy": hierarchy,
                        "thumbnail": thumbnail,
                    });
                });
                faculties[school] = departmentList;
            } catch (error) {
                console.log(error);
            }
        } // for

        fs.writeFileSync('./routes/database/faculty.json', JSON.stringify(faculties, null, 3));
        return faculties;
 
    } // if
    else{
        let faculty = JSON.parse(fs.readFileSync('./routes/database/faculty.json'));
        return faculty;
    }
}

module.exports = fetchFaculties;