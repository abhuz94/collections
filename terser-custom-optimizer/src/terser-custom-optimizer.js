const { Optimizer } = require('@parcel/plugin');
const { minify } = require('terser');

module.exports = new Optimizer({
  async optimize({ contents }) {
    const { code } = await minify(contents);

    return { contents: code };
  },
});
