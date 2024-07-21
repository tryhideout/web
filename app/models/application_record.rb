class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def jsonify
    to_json
  end
end
