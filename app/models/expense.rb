class Expense < ActiveRecord::Base
  self.table_name = 'expenses'
  belongs_to :hideout, foreign_key: 'hideout_id'
  belongs_to :user, foreign_key: 'debtor_id'
  belongs_to :user, foreign_key: 'creditor_id'

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, strict: true
end
