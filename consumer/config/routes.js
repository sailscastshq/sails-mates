/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = async () => {
  const { actions } = await import('federated_actions/actions')

  return {
    'GET /example': actions['example/index'],
    // ... other routes
  }
}
