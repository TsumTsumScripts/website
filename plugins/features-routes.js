// One route per feature -- /features and /features/<key> -- all rendered by the
// same component, which reads the key from the URL. Docusaurus pages cannot
// take a path parameter, and a real URL per feature is what the changelog and
// shared links need.

const {features} = require('../src/data/features');

module.exports = function featuresRoutes() {
  return {
    name: 'features-routes',
    async contentLoaded({actions}) {
      const component = '@site/src/components/FeaturesGuide';
      actions.addRoute({path: '/features', exact: true, component});
      for (const f of features) {
        actions.addRoute({path: `/features/${f.key}`, exact: true, component});
      }
    },
  };
};
