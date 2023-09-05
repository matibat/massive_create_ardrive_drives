const { build } = require('esbuild');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');

const bundle = async () => {
  console.log('Building web bundle esm.');
  const result = await build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'browser',
    target: ['esnext'],
    format: 'esm',
    globalName: '', // TODO: replace this name with your package name
    plugins: [plugin(stdLibBrowser)],
    outfile: './bundles/web.bundle.min.js',
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    define: {
      process: 'process',
    },
  })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    })
    .then(() => {
      console.log('Successfully built web bundle.');
    });
};

(async () => {
  await bundle();
})();

module.exports = bundle;
