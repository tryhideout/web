class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def jsonify
    return self.to_json
  end
end
