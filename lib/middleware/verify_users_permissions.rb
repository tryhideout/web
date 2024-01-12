require 'constants'

module Middleware
  class VerifyUsersPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      if Constants::PUBLIC_ROUTES.include?(request_identifier) or request.path.exclude?(Constants::API_PATHS[:USERS])
        return @app.call(env)
      end

      begin
        user = User.find_by!(id: payload[:id])
        if request.method != Constants::HTTP_METHODS[:POST]
          return 401, {}, [] if path_id != payload[:id] or payload[:id] != user.id
        end
      rescue ActiveRecord::RecordNotFound
        error = { error: 'User not found' }
        return 404, {}, [error.to_json]
      end

      @app.call(env)
    end
  end
end
