class Hideout < ActiveRecord::Base
  self.table_name = 'hideouts'
  has_many :chores, foreign_key: 'hideout_id'
  has_many :expenses, foreign_key: 'hideout_id'
  has_many :users, foreign_key: 'hideout_id'

  validates :name, presence: true, strict: true
  validates :owner_id, presence: true, strict: true
end
