require 'constants'

module Middleware
  class VerifyHideoutsPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      return @app.call(env) if PUBLIC_ROUTES.include?(request_identifier)

      begin
        hideout = Hideout.find_by!(id: path_id)
        user = User.find_by(id: payload['id'])

        if request.method != Constants::HTTP_METHODS[:POST] and request.path.include?(Constants::API_PATHS[:HIDEOUTS]) and
             request.path.exclude?('users')
          hideout = Hideout.find_by!(id: path_id)
          return 401, {}, [] if hideout.id != user.hideout_id
        end

        if (request.method == Constants::HTTP_METHODS[:DELETE] or request.method == Constants::HTTP_METHODS[:PUT]) and
             request.path.include?(Constants::API_PATHS[:HIDEOUTS]) and request.path.exclude?('users')
          owner = Owner.find_by!(hideout_id: hideout.id)
          return 401, {}, [] if owner.user_id != user.id
        elsif request.method == Constants::HTTP_METHODS[:DELETE] and
              request.path.include?(Constants::API_PATHS[:HIDEOUTS]) and request.path.include?('users')
          hideout = Hideout.find_by!(id: path_id)
          return 400, {}, [] if hideout.id != user.hideout_id
        end
      rescue ActiveRecord::RecordNotFound
        error = { error: 'Hideout not found' }
        return 404, {}, [error.to_json]
      end

      @app.call(env)
    end
  end
end
