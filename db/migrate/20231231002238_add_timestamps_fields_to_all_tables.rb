class AddTimestampsFieldsToAllTables < ActiveRecord::Migration[7.0]
  def up
    add_timestamps(:users, null: true)
    add_timestamps(:hideouts, null: true)
    add_timestamps(:expenses, null: true)
    add_timestamps(:chores, null: true)

    User.update_all(created_at: DateTime.now, updated_at: DateTime.now)
    Hideout.update_all(created_at: DateTime.now, updated_at: DateTime.now)
    Expense.update_all(created_at: DateTime.now, updated_at: DateTime.now)
    Chore.update_all(created_at: DateTime.now, updated_at: DateTime.now)

    change_column(:users, :updated_at, :datetime, null: false, precision: 6)
    change_column(:users, :created_at, :datetime, null: false, precision: 6)
    change_column(:hideouts, :updated_at, :datetime, null: false, precision: 6)
    change_column(:hideouts, :created_at, :datetime, null: false, precision: 6)
    change_column(:expenses, :updated_at, :datetime, null: false, precision: 6)
    change_column(:expenses, :created_at, :datetime, null: false, precision: 6)
    change_column(:chores, :updated_at, :datetime, null: false, precision: 6)
    change_column(:chores, :created_at, :datetime, null: false, precision: 6)
  end

  def down
    remove_column :users, :updated_at
    remove_column :users, :created_at
    remove_column :hideouts, :updated_at
    remove_column :hideouts, :created_at
    remove_column :expenses, :updated_at
    remove_column :expenses, :created_at
    remove_column :chores, :updated_at
    remove_column :chores, :created_at
  end
end
