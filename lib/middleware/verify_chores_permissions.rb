require 'constants'

module Middleware
  class VerifyChoresPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      if Constants::PUBLIC_ROUTES.include?(request_identifier) or request.path.exclude?(Constants::API_PATHS[:CHORES])
        return @app.call(env)
      end

      begin
        user = User.find_by(id: payload[:id])
        if request.method != Constants::HTTP_METHODS[:POST]
          chore = Chore.find_by!(id: path_id)
          return 401, {}, [] if chore.hideout_id != user.hideout_id
        elsif request.method == Constants::HTTP_METHODS[:POST]
          return 400, {}, [] if user.hideout_id == nil
        end
      rescue ActiveRecord::RecordNotFound
        return 404, {}, [ResponseHelper.generate_error_response('Chore not found.')]
      end

      @app.call(env)
    end
  end
end
