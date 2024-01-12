require 'constants'
module Middleware
  class VerifyAccessToken
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, _, payload = MiddlewareHelper.retrieve_request_details(request)
      puts request.origin

      if not Constants::PUBLIC_ROUTES.include?(request_identifier)
        authoriation_header = request.headers[:Authorization]
        return 401, {}, [ResponseHelper.generate_error_response('Invalid access token.')] if authoriation_header.nil?

        access_token = authoriation_header.split[1]
        result = AuthHelper.validate_token_by_type(:ACCESS, access_token)

        begin
          payload = result[:payload]
          payload.transform_keys!(&:to_sym)
          current_user = User.find_by!(email: payload[:email])
          payload[:hideout_id] = current_user.hideout_id
          request.params[:payload] = payload
          request.update_param(:payload, payload)
        rescue Exceptions::JWTException
          return 401, {}, [ResponseHelper.generate_error_response('Invalid access token.')]
        rescue ActiveRecord::RecordNotFound
          return 400, {}, [ResponseHelper.generate_error_response('User not found.')]
        end
      end

      @app.call(env)
    end
  end
end
