const JSON_HEADER = new Headers({ "Content-Type": "application/json" });

const errCheck = res => {
  // err function
  if (!res.ok) {
    throw new Error(res.status);
  }
};

export const toPdf = async (data, errHandler) => {
  try {
    const body = {
        options: { landscape: true },
        data: `<!DOCTYPE html><html>${data}</html>`
      },
      options = {
        method: "POST",
        headers: JSON_HEADER,
        body: JSON.stringify(body)
      };
    let res = await fetch(`/api/pdf`, options);
    // catch bad res and throw err
    errCheck(res);
    // otherwise convert to file to blob to handle
    res = await res.blob();
    // call to prompt user for download
    return new Blob([res], { type: "application/pdf" });
  } catch (err) {
    errHandler(
      `Opps. Looks like there was trouble creating the pdf. Error: ${err.message ||
        err}`
    );
  }
};

export const getStatus = async () => {
  try {
    const res = await fetch("/api");
    // if the server responds w/ 200 we know its awake
    if (res.status === 200) {
      return true;
    }
    // otherwise return false
    return false;
  } catch (err) {
    return false;
  }
};

export const logError = async (error, errHandler) => {
  try {
    // set up req
    const options = {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify(error)
    };
    // post new error
    const res = await fetch("/api/errors", options);
    // check that res is okay, fetch is silly that way
    errCheck(res);
    return await res.json();
  } catch (err) {
    errHandler(
      `Opps. Looks like there was trouble logging an error. Maybe the server is offline? Error: ${err.message ||
        err}`
    );
  }
};

export const getErrors = async errHandler => {
  try {
    const res = await fetch("/api/errors");
    // check that res is okay, fetch is silly that way
    errCheck(res);
    return await res.json();
  } catch (err) {
    errHandler(
      `Opps. Looks like there was trouble getting the logs. Maybe the server is offline? Error: ${err.message ||
        err}`
    );
  }
};
