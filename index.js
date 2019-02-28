const http = require('http')

const PORT = 4040

const routes = new Map()

const registerRoute = (route, handler) => {
  routes.set(route, handler)
}

const getMatchedRouteHandler = (pathname, defaultRouteHandler) => {
  for (const [route, handler] of routes.entries()) {
    if (new RegExp(route).test(pathname)) {
      return handler
    }
  }
  
  return defaultRouteHandler
}

const notFoundRoute = (req, res) => {
  res.statusCode = 404
  res.end()
}

const healthRoute = (req, res) => res.end('OK')

const usersRoute = (req, res) => res.end('USERS')

const userRoute = (req, res) => res.end('USER')

registerRoute('^/$', healthRoute)
registerRoute('^/users$', usersRoute)
registerRoute('^/users/(\\d+)$', userRoute)

function serverHandler(req, res) {
  const matchedRoute = getMatchedRouteHandler(req.url, notFoundRoute)
  matchedRoute(req, res)
}

const server = http.createServer(serverHandler)

server.listen(PORT)