var fs = require('fs');

var totalLines = 0;
var lines = [];
var names = [];
var firstNames = [];
var dupeNames = {};
var dateDonationCount = [];
var dateDonations = {};

fs.readFile(
  '/Users/pxn5096/Downloads/indiv18/itcont.txt',
  'utf8',
  (err, contents) => {
    console.time('line count');
    totalLines = contents.split('\n').length - 1;
    console.log(totalLines);
    console.timeEnd('line count');

    console.time('names');
    lines = contents.split('\n');
    lines.forEach(line => {
      var name = line.split('|')[7];
      names.push(name);
    });

    console.log(names[432]);
    console.log(names[43243]);
    console.timeEnd('names');

    console.time('most common first name');
    names.forEach(name => {
      var firstHalfOfName = name.split(', ')[1];

      if (firstHalfOfName !== undefined && firstHalfOfName.includes(' ')) {
        firstName = firstHalfOfName.split(' ')[0];
      } else {
        firstNames.push(firstHalfOfName);
      }
      firstNames.push(firstHalfOfName);
    });

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
    console.log(sortedDupeNames[sortedDupeNames.length - 1]);
    console.timeEnd('most common first name');

    console.time('total donations for each month');
    lines.forEach(line => {
      var timestamp = line.split('|')[4].slice(0, 6);
      var formattedTimestamp =
        timestamp.slice(0, 4) + '-' + timestamp.slice(4, 6);
      dateDonationCount.push(formattedTimestamp);
    });

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
  },
);