require 'json'

require_relative '../../app/helpers/auth_helper.rb'

module Middleware
  class VerifyHideoutId
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier = "#{request.method} #{request.path}"
      if not ENV['PUBLIC_ROUTES'].include?(request_identifier)
        authoriation_header = request.headers[:Authorization]
        return 401, {}, [] if authoriation_header.nil?

        access_token = authoriation_header.split[1]
        result = AuthHelper.validate_token_by_type(:ACCESS, access_token)
        return 401, {}, [] unless result[:success]

        begin
          payload = result[:payload]
          payload.transform_keys!(&:to_sym)
          current_hideout = Hideout.find_by(id: payload[:hideout_id])
          return 400, {}, [] unless current_hideout == request.params[:hideout_id].to_i

          request.update_param(:payload, result[:payload])

        rescue ActiveRecord::RecordNotFound
          return 400, {}, []
        end
      end

      @app.call(env)
    end
  end
end