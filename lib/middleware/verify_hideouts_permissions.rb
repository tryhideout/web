require 'constants'

module Middleware
  class VerifyHideoutsPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      if Constants::PUBLIC_ROUTES.include?(request_identifier) or request.path.exclude?(Constants::API_PATHS[:HIDEOUTS])
        return @app.call(env)
      end

      begin
        user = User.find_by(id: payload[:id])

        if request.method != Constants::HTTP_METHODS[:POST] and request.path.exclude?('users')
          hideout = Hideout.find_by!(id: path_id)
          if hideout.id != user.hideout_id
            return 401, {}, [ResponseHelper.generate_error_response('User not in provided hideout.')]
          end
        elsif request.method == Constants::HTTP_METHODS[:POST] and request.path.exclude?('users')
          if payload[:id] != request.params['owner_id']
            return 400, {}, [ResponseHelper.generate_error_response('Owner ID must be the same as token user ID.')]
          end
          unless user.hideout_id.nil?
            return 400, {}, [ResponseHelper.generate_error_response('User already in hideout.')]
          end
        end

        if (request.method == Constants::HTTP_METHODS[:DELETE] or request.method == Constants::HTTP_METHODS[:PUT]) and
           request.path.exclude?('users')
          hideout = Hideout.find_by!(id: path_id)
          owner = Owner.find_by!(hideout_id: hideout.id)
          if owner.user_id != user.id
            return 401, {}, [ResponseHelper.generate_error_response('Updating hideouts requires owner privileges.')]
          end
        elsif request.method == Constants::HTTP_METHODS[:DELETE] and request.path.include?('users')
          hideout = Hideout.find_by!(id: path_id)
          if hideout.id != user.hideout_id
            return 400, {}, [ResponseHelper.generate_error_response('User not in provided hideout.')]
          end
        end
      rescue ActiveRecord::RecordNotFound
        return 404, {}, [ResponseHelper.generate_error_response('Hideout not found.')]
      end

      @app.call(env)
    end
  end
end
