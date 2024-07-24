class Owner < ApplicationRecord
  self.table_name = 'owners'
  belongs_to :user
  belongs_to :hideout
end
