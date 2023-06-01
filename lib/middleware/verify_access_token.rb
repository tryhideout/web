require_relative '../../app/helpers/auth_helper.rb'

module Middleware
  class VerifyAccessToken
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier = "#{request.method} #{request.path}"
      if not ENV['PUBLIC_ROUTES'].include?(request_identifier)
        authoriation_header = request.headers[:Authorization]
        return 400, {}, [] if authoriation_header.nil?

        access_token = authoriation_header.split[1]
        result = AuthHelper.validate_token_by_type(:ACCESS, access_token)
        return 401, {}, [] if not result[:success]
      end

      @app.call(env)
    end
  end
end
