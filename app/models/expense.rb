class Expense < ApplicationRecord
  self.table_name = 'expenses'
  belongs_to :hideout
  belongs_to :debtor, class_name: 'User', optional: true
  belongs_to :creditor, class_name: 'User', optional: true

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, strict: true

  def self.new_expense(name:, amount:, due_date:, debtor_id:, creditor_id:, comments:, active:, hideout_id:)
    validate_debtor_or_creditor_id(id: debtor_id) unless debtor_id.nil?
    validate_debtor_or_creditor_id(id: creditor_id) unless creditor_id.nil?
    Expense.create!(
      name:,
      amount:,
      due_date:,
      debtor_id:,
      creditor_id:,
      comments:,
      active:,
      hideout_id:
    )
  end

  def self.get_all_expenses_by_hideout_id(hideout_id:)
    Expense.where(hideout_id:)
  end

  def update_expense(name:, amount:, due_date:, debtor_id:, creditor_id:, comments:, active:)
    validate_debtor_or_creditor_id(id: debtor_id) unless debtor_id.nil?
    validate_debtor_or_creditor_id(id: creditor_id) unless creditor_id.nil?
    update(
      name:,
      amount:,
      due_date:,
      debtor_id:,
      creditor_id:,
      comments:,
      active:
    )
  end

  private

  def validate_debtor_or_creditor_id(id:)
    user = User.find_by!(id:)
    raise Exceptions::ModelException.new('Debtor or creditor not in hideout.') if user.hideout_id != hideout_id
  end
end
