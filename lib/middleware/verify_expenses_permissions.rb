require 'constants'

module Middleware
  class VerifyExpensesPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      return @app.call(env) if PUBLIC_ROUTES.include?(request_identifier)

      begin
        user = User.find_by(id: payload['id'])
        if request.method != Constants::HTTP_METHODS[:POST] and request.path.include?(Constants::API_PATHS[:EXPENSES])
          expense = Expense.find_by!(id: path_id)
          return 401, {}, [] if expense.hideout_id != user.hideout_id
        elsif request.method == Constants::HTTP_METHODS[:POST]
          return 400, {}, [] if user.hideout_id == nil
        end
      rescue ActiveRecord::RecordNotFound
        error = { error: 'Expense not found' }
        return 404, {}, [error.to_json]
      end

      @app.call(env)
    end
  end
end
