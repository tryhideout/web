class Constants
  HTTP_METHODS = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' }
  ENVIRONMENTS = { DEVELOPMENT: 'development', TEST: 'test', PRODUCTION: 'production' }
  LOCALHOST_API_URL = 'http://localhost:4000/api'
  LOCAL_ENV_YAML_FILE = 'local_env.yml'
  API_PATHS = {
    HEALTH: '/api/health',
    SESSIONS: '/api/sessions',
    SESSIONS_TOKEN: '/api/sessions/token',
    USERS: '/api/users',
    HIDEOUTS: '/api/hideouts',
    EXPENSES: '/api/expenses',
    CHORES: '/api/chores',
  }
  PUBLIC_ROUTES = [
    [HTTP_METHODS[:GET], API_PATHS[:HEALTH]],
    [HTTP_METHODS[:POST], API_PATHS[:USERS]],
    [HTTP_METHODS[:DELETE], API_PATHS[:SESSIONS]],
    [HTTP_METHODS[:GET], API_PATHS[:SESSIONS]],
    [HTTP_METHODS[:POST], API_PATHS[:SESSIONS]],
    [HTTP_METHODS[:GET], API_PATHS[:SESSIONS_TOKEN]],
  ]
end
