import { commonFunctions } from './common/functions';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['canvas'],
    name: 'canvas-plugin-coalesce',
    uiExports: {
      hacks: [
        // register functions and the like things with canvas
        'plugins/canvas-plugin-coalesce/lib/load_plugin.js',
      ],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {
      // here we register the available server assets, along with any common assets

      // register server and common functions in the client runtime
      commonFunctions.forEach(fn => server.plugins.canvas.addFunction(fn));
    }
  });
}
