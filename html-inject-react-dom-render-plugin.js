require('@babel/register');
const HtmlWebpackPlugin = require('./html-webpack-plugin');
const ReactDOMServer = require('./react/build/node_modules/react-dom/server');
const React = require('react');

module.exports = class HtmlInjectReactDomRenderPlugin {
  static PLUGIN_NAME = 'HTML Inject React DOM Render Plugin';

  /**
   * @param {{ elementId: string, componentFile: string }} options
   */
  constructor(options = {}) {
    this.options = options;
    this.beforeEmit = this.beforeEmit.bind(this);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      HtmlInjectReactDomRenderPlugin.PLUGIN_NAME,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
          HtmlInjectReactDomRenderPlugin.PLUGIN_NAME,
          this.beforeEmit
        );
      }
    );
  }

  /**
   *  Called after Html Webpack Plugin finishes injecting scripts into
   *  html file but before emitting the file to the output directory
   */
  beforeEmit(data) {
    const pattern = new RegExp(`<[^>]*id="${this.options.elementId}"[^>]*>`);
    const Component = require(this.options.componentFile).default;

    const renderString = ReactDOMServer.renderToString(
      React.createElement(Component)
    );
    data.html = data.html.replace(pattern, `$&${renderString}`);
    return data;
  }
};
