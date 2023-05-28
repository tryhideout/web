module Middleware
  class VerifyUserAuth
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier = "#{request.method} #{request.path}"
      if !ENV['PUBLIC_ROUTES'].include?(request_identifier)

      else

      end

      @app.call(env)
    end
  end
end
