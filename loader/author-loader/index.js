const schema = require("./schema.json");

module.exports = function (content) {
  const options = this.getOptions(schema);
  const prefix = `
    /*
    * author: ${options.author}
    */
  `;
  return `${prefix}\n ${content}`;
};
