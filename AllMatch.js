const request = require('request');

const cheerio = require('cheerio');

const scorecardObj = require('./scorecard')


function getAllMatchLink(uri){
    request(uri, function(error, response, html){
        if(error){
            console.log(error);
        }else{
            extractAllMatchLink(html);
        }
    });
}

function extractAllMatchLink(html){
    let $ = cheerio.load(html);

    let ScoreCardElemArr = $('a[data-hover="Scorecard"]');

    for(let i=0;i<ScoreCardElemArr.length;i++){
        let ScoreCardLink = $(ScoreCardElemArr[i]).attr('href');

        let fullLink = 'https://www.espncricinfo.com'+ScoreCardLink;

        console.log(fullLink);

        scorecardObj.ps(fullLink);
    }
}

module.exports={
    getAllMatch : getAllMatchLink
}