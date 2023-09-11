module Middleware
  class VerifyUserPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      request_identifier = "#{request.method} #{request.path}"
      path_id = request.path.scan(/\d+/).first.to_i
      payload = request.params['payload']

      return @app.call(env) if ENV['PUBLIC_ROUTES'].include?(request_identifier)

      begin
        user = User.find_by!(id: payload['id'])
        if request.method != 'POST' and request.path.include?('/api/users')
          return 400, {}, [] if path_id != payload['id']
        elsif request.method != 'POST' and request.path.include?('/api/chores')
          chore = Chore.find_by!(id: path_id)
          return 401, {}, [] if chore.hideout_id != user.hideout_id
        elsif request.method != 'POST' and request.path.include?('/api/expenses')
          expense = Expense.find_by!(id: path_id)
          return 401, {}, [] if expense.hideout_id != user.hideout_id
        elsif request.method != 'POST' and request.path.include?('/api/hideouts') and request.path.exclude?('users')
          hideout = Hideout.find_by!(id: path_id)
          return 401, {}, [] if hideout.id != user.hideout_id
        end

        if request.method == 'POST' and (request.path.include?('/api/expenses') or request.path.include?('/api/chores'))
          return 400, {}, [] if user.hideout_id == nil
        elsif (request.method == 'DELETE' or request.method == 'POST') and request.path.include?('/api/hideouts') and
              request.path.exclude?('users')
          hideout = Hideout.find_by!(id: path_id)
          return 401, {}, [] if hideout.owner_id != user.id
        elsif request.method == 'DELETE' and request.path.include?('/api/hideouts') and request.path.include?('users')
          hideout = Hideout.find_by!(id: path_id)
          return 400, {}, [] if hideout.id != user.hideout_id
        end
      rescue ActiveRecord::RecordNotFound
        return 404, {}, []
      end

      @app.call(env)
    end
  end
end
