module Middleware
  class VerifyUserPermissions
    def initialize(app)
      @app = app
    end

    def call(env)
      request = ActionDispatch::Request.new(env)
      path_id = request.path.scan(/\d+/).first.to_i
      payload = request.params['payload']

      begin
        if request.method != 'POST' and request.path.include?('/api/users')
          User.find_by!(id: path_id)
          return 400, {}, [] if path_id != payload['id']
        elsif request.method != 'POST' and request.path.include?('/api/hideouts')
          hideout = Hideout.find_by!(id: path_id)
          return 401, {}, [] if hideout.id != payload['hideout_id']
        elsif request.method != 'POST' and request.path.include?('/api/chores')
          chore = Chore.find_by!(id: path_id)
          return 401, {}, [] if chore.hideout_id != payload['hideout_id']
        elsif request.method != 'POST' and request.path.include?('/api/expenses')
          expense = Expense.find_by!(id: path_id)
          return 401, {}, [] if expense.hideout_id != payload['hideout_id']
        elsif request.method == 'POST' and (request.path.include?('/api/expenses') or request.path.include?('/api/chores'))
          resource_hideout_id = request.params['hideout_id']
          return 401, {}, [] if resource_hideout_id != payload['hideout_id']
        elsif request.method == 'POST' and request.path.include?('/api/hideouts')
          owner_id = request.params['owner_id']
          return 401, {}, [] if owner_id != payload['id']
        end
      rescue ActiveRecord::RecordNotFound
        return 404, {}, []
      end

      @app.call(env)
    end
  end
end
