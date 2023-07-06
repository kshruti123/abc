const licenseValidate = (licenses) => {
  let licensesTable = [];
  if (Array.isArray(licenses)) {
    licensesTable = licenses;
  } else {
    licensesTable.push(licenses);
  }
  if (licensesTable.length > 1) {
    return { error: "Upload only 1 PDF file" };
  }
  for (let license of licensesTable) {
    if (license.size > 10485760)
      return { error: "Size too large (above 10MB)" };
    const filetypes = /pdf/;
    const mimetype = filetypes.test(license.mimetype);
    if (!mimetype) return { error: "Incorrect mime type (should be PDF)" };
  }
  return { error: false };
};

module.exports = licenseValidate;
