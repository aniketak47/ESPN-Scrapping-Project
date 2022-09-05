const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require('request');

const cheerio = require('cheerio');

const allMatchObj = require('./AllMatch');

const fs = require('fs');

const path = require('path');

let iplPath = path.join(__dirname, "IPL") //__dirname gives the current path

dirCreator(iplPath);


request(url, cb);

function cb (error, response, html){
    if(error){
        console.log(error);
    }else{
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);

    // let anchorElem = $('a[data-hover="View All Results"]'); //it also works this is known as anchor-selector
    let anchorElem = $('.widget-items.cta-link>a');

    let link = anchorElem.attr('href');

    let fullLink = 'https://www.espncricinfo.com'+link;

    console.log(fullLink);

    allMatchObj.getAllMatch(fullLink);
    
}


function dirCreator(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }
}



// a[data-hover="Scorecard"]
