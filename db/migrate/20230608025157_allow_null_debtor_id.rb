class AllowNullDebtorId < ActiveRecord::Migration[7.0]
  def up
    change_column :expenses, :debtor_id, :bigint, null: true
  end

  def down
    change_column :expenses, :debtor_id, :bigint, null: false
  end
end
