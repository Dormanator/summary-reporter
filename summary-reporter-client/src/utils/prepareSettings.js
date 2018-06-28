export const prepareTargets = (data, settings) => {
  settings = { ...settings };
  if (settings.targets && Object.keys(settings.targets).length > 0) {
    // if a 'targets' property and obj exists with keys in it create a new obj to store any new entries or report items to target
    // TODO:
    // do deep compare
    for (let entry in data) {
      // first we look for new entries that need all targets initalized
      if (!settings.targets[entry]) {
        settings.targets[entry] = setupTargetsForEntry(entry, data, settings);
        //  otherwise teh entry exists and we need to find out if any targets are missing
      } else {
        // establish an empty array to push missing targets to
        let missingTargets = [];
        // get an array of the items already being targeted in the settings for that entry
        const existingTargets = Object.keys(settings.targets[entry]);
        // if user opted to set targets for all set all items as array otherwise set reported on items
        const allReportedItems = settings.targetsForAllItems
          ? settings.reportItems
          : findItemsToTarget(entry, data, settings);
        // itereate through items that need to be targeted
        allReportedItems.forEach(
          item =>
            !existingTargets.includes(item)
              ? // if missing from the current targets set push report item to missingTargets array
                missingTargets.push(item)
              : null
        );
        // initalize any missingTargets to zero
        missingTargets.forEach(item => (settings.targets[entry][item] = 0));
      }
    }
    return settings;
  } else {
    //otherwise we will setup the target structure based on the entries and objectives in the parsed data
    settings.targets = {};
    // store targets for each entry
    for (let entry in data) {
      settings.targets[entry] = setupTargetsForEntry(entry, data, settings);
    }

    return settings;
  }
  function setupTargetsForEntry(entry, data, settings) {
    let entryObj = {},
      targetItems;
    // if settings.targetsForAllItems is false
    if (settings.targetsForAllItems) {
      targetItems = settings.reportItems;
    } else {
      targetItems = findItemsToTarget(entry, data, settings);
    }
    //  create zeroed-out target entries for each entry based on teh targetItems identified
    targetItems.forEach(item => (entryObj[item] = 0));
    return entryObj;
  }

  function findItemsToTarget(entry, data, settings) {
    // create array for only reportItems that appear in data for each entry
    // iterate through possible months and grab array of all objectives seen via Object.keys
    const targetItems = settings.reportPeriod
      .reduce((a, b) => {
        let itemsForInterval = data[entry][settings.reportBasis][b];
        return itemsForInterval ? [...a, ...Object.keys(itemsForInterval)] : a;
      }, [])
      // filter out duplicate items
      .filter((item, i, arr) => arr.lastIndexOf(item) === i);
    return targetItems;
  }
};

export const prepareSettingsFile = settings => {
  return (
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(settings))
  );
};
