class AddExpensesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :expenses do |t|
      t.string :name, null: false
      t.bigint :amount, null: false
      t.datetime :due_date, null: true
      t.references :debtor, null: true, foreign_key: { to_table: :users, on_delete: :nullify }
      t.references :hideout, null: false, foreign_key: { to_table: :hideouts, on_delete: :cascade }
      t.string :comments, null: true, limit: 100
    end
  end
end
