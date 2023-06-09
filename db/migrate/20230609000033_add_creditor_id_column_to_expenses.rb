class AddCreditorIdColumnToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_reference :expenses, :creditor, null: true, foreign_key: { to_table: :users, on_delete: :nullify }
  end
end
