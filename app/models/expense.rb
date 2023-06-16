class Expense < ActiveRecord::Base
  self.table_name = 'expenses'
  belongs_to :hideout
  belongs_to :user, foreign_key: 'debtor_id'
  belongs_to :user, foreign_key: 'creditor_id'

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, strict: true
  validates :hideout_id, presence: true, strict: true
  validates :debtor_id, presence: true, unless: -> { debtor_id.blank? }, strict: true
  validates :creditor_id, presence: true, unless: -> { creditor_id.blank? }, strict: true
end
