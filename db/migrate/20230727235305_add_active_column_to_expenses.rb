class AddActiveColumnToExpenses < ActiveRecord::Migration[7.0]
  def change
    add_column :expenses, :active, :boolean, null: false, default: true
  end
end
