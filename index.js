export default function (kibana) {
  return new kibana.Plugin({
    require: ['interpreter', 'canvas'],
    name: 'canvas-plugin-coalesce',
    uiExports: {
      canvas: ['plugins/canvas-plugin-coalesce']
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    }
  });
}
