const reportParser = (dataArray, settings) => {
  "strict";
  // GOAL {personName: { headerData: {...}, monthlyData: {jan: { obj1: 1, obj2: 5, ...}, feb: {obj1: 3, obj2: 6, obj3: 2, ...}, ...} }, personName2: {...}, ...}
  let reportObj = {};
  for (let entry of dataArray) {
    // establish groupBy for current entry
    const groupBy = entry[settings.groupBy].toLowerCase();
    // if property set to group people by (email by default) from data entry is not a prop on final obj
    if (!reportObj[groupBy]) {
      // create a new propety for the given email and all the project info to it
      reportObj = createNewEntry(entry, groupBy, reportObj, settings);
      // add the objective time interval being reported on to teh reportBasis property
      reportObj = addIntervalToEntry(entry, groupBy, reportObj, settings);
      // and add the objectives and counts accomplished for that interval
      reportObj = addObjectivesToInterval(entry, groupBy, reportObj, settings);
    } else {
      // otherwise the property exists for this person
      // and we simply need to add to the report time interval
      reportObj = addIntervalToEntry(entry, groupBy, reportObj, settings);
      // add the objectives and counts accomplished for that interval
      reportObj = addObjectivesToInterval(entry, groupBy, reportObj, settings);
    }
  }

  function createNewEntry(entry, groupBy, reportObj, settings) {
    // create key to group entries by with obj value
    reportObj[groupBy] = {};

    // create key to store general report info
    reportObj[groupBy].headers = {};
    // if a fullName setting was specified create the name with the given properties and add it to the headers
    // can be used to construct a name out of multiple properties on the input data
    // useful if name data was split up in multiple excel columns
    if (settings.fullName && settings.fullName.length > 0) {
      reportObj[groupBy].headers[settings.nameLabel || "Name"] =
        settings.fullName.length === 1
          ? entry[settings.fullName[0]]
          : settings.fullName.reduce((a, b) => entry[a] + " " + entry[b]);
    }
    // store general report info/headers in keys/values based on list in settings
    settings.headers.forEach(props => {
      reportObj[groupBy].headers[props] = entry[props];
    });
    // create and empty obj on the entry to store the data being reported, time-series counts
    reportObj[groupBy][settings.reportBasis] = {};
    return reportObj;
  }

  // we are working with time-series data, this is to add time intervals to individual report entries to store count data
  function addIntervalToEntry(entry, groupBy, reportObj, settings) {
    const objectives = reportObj[groupBy][settings.reportBasis],
      reportIntervals = entry[settings.reportIntervals];
    // if a key for the reportInterval value exists in reportBasis obj
    if (objectives[reportIntervals]) {
      // then we dont need to add the interval and can return the obj
      return reportObj;
    }
    // otherwise create key based on reportIntervals and set to empty obj
    objectives[reportIntervals] = {};
    return reportObj;
  }

  // this is for adding keys for objectives with count data to time-interval objects
  function addObjectivesToInterval(entry, groupBy, reportObj, settings) {
    const objectives = reportObj[groupBy][settings.reportBasis],
      reportIntervals = entry[settings.reportIntervals];
    // for each item being reported on in the objectives
    settings.reportItems.forEach(item => {
      // if specified objective property exists on month obj
      if (entry[item]) {
        const reported = parseInt(entry[item], 10);
        let currentCount = objectives[reportIntervals][item];
        // add number count from current entry to existing objective's count
        objectives[reportIntervals][item] = currentCount + reported || reported;
      }
    });
    return reportObj;
  }

  return reportObj;
};

//module.exports = reportParser;
export default reportParser;
