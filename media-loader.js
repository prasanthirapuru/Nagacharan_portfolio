const path = require("path");

module.exports = function () {
  const resourcePath = this.resourcePath;
  const match = resourcePath.match(/src[\\/]assets[\\/]works[\\/](.+)$/);
  if (match) {
    const relativePath = match[1].replace(/\\/g, "/");
    return `module.exports = "/works/${relativePath}";`;
  }
  return `module.exports = "";`;
};
