var fs = require('fs'),
  es = require('event-stream');

var totalLines = 0;
var lines = [];
var names = [];
var firstNames = [];
var dupeNames = {};
var dateDonationCount = [];
var dateDonations = {};

var s = fs
  // .createReadStream('test.txt')
  // .createReadStream('itcont.txt')
  .createReadStream('/Users/pxn5096/Downloads/indiv18/itcont.txt')
  .pipe(es.split())
  .pipe(
    es
      .mapSync(function(line) {
        console.time('line count');
        totalLines++;

        // get all names
        console.time('names');
        var name = line.split('|')[7];
        if (totalLines === 432 || totalLines === 43243) {
          names.push(name);
        }

        // get all first halves of names
        console.time('most common first name');
        var firstHalfOfName = name.split(', ')[1];
        // filter out middle initials
        if (firstHalfOfName !== undefined && firstHalfOfName.includes(' ')) {
          firstName = firstHalfOfName.split(' ')[0];
        } else {
          firstNames.push(firstHalfOfName);
        }
        firstNames.push(firstHalfOfName);

        firstNames.forEach(x => {
          dupeNames[x] = (dupeNames[x] || 0) + 1;
        });
        var sortedDupeNames = [];
        for (var name in dupeNames) {
          sortedDupeNames.push([name, dupeNames[name]]);
        }
        sortedDupeNames.sort((a, b) => {
          return a[1] - b[1];
        });

        // year and month
        console.time('total donations for each month');
        var timestamp = line.split('|')[4].slice(0, 6);
        var formattedTimestamp =
          timestamp.slice(0, 4) + '-' + timestamp.slice(4, 6);
        dateDonationCount.push(formattedTimestamp);
      })
      .on('error', function(err) {
        console.log('Error while reading file.', err);
      })
      .on('end', function() {
        console.log('Read entire file.');
        console.log(totalLines);
        console.timeEnd('line count');

        console.log(names);
        console.timeEnd('names');

        // most common first name
        console.log(sortedDupeNames[sortedDupeNames.length - 1]);
        console.timeEnd('most common first name');

        // number of donations per month
        dateDonationCount.forEach(x => {
          dateDonations[x] = (dateDonations[x] || 0) + 1;
        });
        logDateElements = (key, value, map) => {
          console.log(
            `Donations per month and year: ${value} and donation count ${key}`,
          );
        };
        new Map(Object.entries(dateDonations)).forEach(logDateElements);
        console.timeEnd('total donations for each month');
      }),
  );