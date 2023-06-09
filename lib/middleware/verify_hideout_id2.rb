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
        if request.method != 'post' and request.path.include?('/api/hideouts')
          begin
            # hideout_id = request.path.split('/')[3]
            hideout_id = request.params['hideout_id']
            hideout = Hideout.find_by!(id: hideout_id)
  
          rescue ActiveRecord::RecordNotFound
            return 400, {}, []
          end
        end
  
        @app.call(env)
      end
    end
  end
  