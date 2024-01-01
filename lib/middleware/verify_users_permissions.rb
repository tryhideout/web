require 'constants'

module Middleware
  class VerifyUsersPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      return @app.call(env) if Constants::PUBLIC_ROUTES.include?(request_identifier)

      begin
        User.find_by!(id: payload['id'])
        if request.method != Constants::HTTP_METHODS[:POST] and request.path.include?(Constants::API_PATHS[:USERS])
          return 400, {}, [] if path_id != payload['id']
        end
      rescue ActiveRecord::RecordNotFound
        error = { error: 'User not found' }
        return 404, {}, [error.to_json]
      end

      @app.call(env)
    end
  end
end
