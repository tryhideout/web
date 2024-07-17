require 'constants'

module Middleware
  class VerifyExpensesPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier, path_id, payload = MiddlewareHelper.retrieve_request_details(request)
      if Constants::PUBLIC_ROUTES.include?(request_identifier) or request.path.exclude?(Constants::API_PATHS[:EXPENSES])
        return @app.call(env)
      end

      begin
        user = User.find_by(id: payload[:id])
        if request.method != Constants::HTTP_METHODS[:POST]
          expense = Expense.find_by!(id: path_id)
          if expense.hideout_id != user.hideout_id
            return 401, {}, [ResponseHelper.generate_error_response('User not in referenced hideout.')]
          end
        elsif request.method == Constants::HTTP_METHODS[:POST]
          Hideout.find_by!(id: request.params[:hideout_id])
          return 400, {}, [ResponseHelper.generate_error_response('User must be in a hideout.')] if user.hideout_id == nil
        end
      rescue ActiveRecord::RecordNotFound
        return 404, {}, [ResponseHelper.generate_error_response('Expense not found.')]
      end

      @app.call(env)
    end
  end
end
