const s = require('./googleSheet.js');
// s.loadGoogleSpreadSheet();
s.getSchedule().then((value) => {
    console.log(value);
});
