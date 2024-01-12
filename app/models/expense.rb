class Expense < ApplicationRecord
  self.table_name = 'expenses'
  belongs_to :hideout, foreign_key: 'hideout_id'
  belongs_to :debtor, class_name: 'User', foreign_key: 'debtor_id', optional: true
  belongs_to :creditor, class_name: 'User', foreign_key: 'creditor_id', optional: true

  validates :amount, numericality: { greater_than_or_equal_to: 0 }, strict: true

  def self.new_expense(name:, amount:, due_date:, debtor_id:, creditor_id:, comments:, active:, hideout_id:)
    validate_debtor_or_creditor_id(id: debtor_id) if !debtor_id.nil?
    validate_debtor_or_creditor_id(id: creditor_id) if !creditor_id.nil?
    expense =
      Expense.create!(
        name: name,
        amount: amount,
        due_date: due_date,
        debtor_id: debtor_id,
        creditor_id: creditor_id,
        comments: comments,
        active: active,
        hideout_id: hideout_id,
      )
    return expense
  end

  def self.get_all_expenses_by_hideout_id(hideout_id:)
    expenses = Expense.where(hideout_id: hideout_id)
    return expenses
  end

  def update_expense(name:, amount:, due_date:, debtor_id:, creditor_id:, comments:, active:)
    validate_debtor_or_creditor_id(id: debtor_id) if !debtor_id.nil?
    validate_debtor_or_creditor_id(id: creditor_id) if !creditor_id.nil?
    expense =
      self.update(
        name: name,
        amount: amount,
        due_date: due_date,
        debtor_id: debtor_id,
        creditor_id: creditor_id,
        comments: comments,
        active: active,
      )
    return expense
  end

  private

  def validate_debtor_or_creditor_id(id:)
    user = User.find_by!(id: id)
    raise Exceptions::ModelException.new('Debtor or creditor not in hideout.') if user.hideout_id != hideout_id
  end
end
