module Middleware
  class VerifyUserPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      puts request.method
      if request.method != 'POST' and request.path.include?('/api/users')
        payload = request.params['payload']
        return 400, {}, [] if request.params['id'] != payload['id']
      end

      @app.call(env)
    end
  end
end
