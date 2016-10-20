/// <reference path="../../include.d.ts" />

var fs = require('fs');

var files = fs.readdirSync('articles');

files.forEach(function loopFile(file, index, array) {
    var fullPath = 'articles/' + file;
    var aJson = JSON.parse(fs.readFileSync(fullPath).toString());
    if ((!aJson.text) && (!aJson.title)) {
        return;
    }
    var sql = "insert into p_petitions values(";
    sql += "" + index + ",";
    sql += "'" + aJson.title.replace(/'/g, '"') + "',";
    sql += "'" + aJson.author.replace(/'/g, '"') + "',";
    sql += "'" + aJson.text.replace(/'/g, '"') + "');\r\n";
    fs.appendFileSync('petitions.sql', sql);
    var comments = aJson.signatures;

    comments.forEach(function loopComments(commentEntity, ceIndex, array) {
        commentEntity.comments.forEach(function (comment, cIndex, array) {
            var cSql = "insert into p_signatures (petitions_id, comment) values(";
            cSql += "" + index + ",";
            cSql += "'" + comment.replace(/'/g, '"') + "');\r\n";
            fs.appendFileSync('petitions.sql', cSql);
        });

    });
});