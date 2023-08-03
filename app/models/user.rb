class User < ActiveRecord::Base
  self.table_name = 'users'
  has_many :chores, foreign_key: 'assignee_id'
  has_many :credit_expenses, class_name: 'Expense', foreign_key: 'creditor_id'
  has_many :debt_expenses, class_name: 'Expense', foreign_key: 'debtor_id'
  belongs_to :hideout, foreign_key: 'hideout_id', optional: true

  validates :email, presence: true, strict: true
  validates :first_name, presence: true, strict: true
  validates :last_name, presence: true, strict: true
  validates :hideout_id, absence: true, if: -> { hideout_id.blank? }, strict: true
end
