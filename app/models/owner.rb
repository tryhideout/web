class Owner < ApplicationRecord
  self.table_name = 'owners'
  belongs_to :user, foreign_key: 'user_id'
  belongs_to :hideout, foreign_key: 'hideout_id'
end
