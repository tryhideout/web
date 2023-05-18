class AddAssigneeColumnToChores < ActiveRecord::Migration[7.0]
  def change
    add_reference :chores, :assignee, null: true, foreign_key: {to_table: :users, on_delete: :cascade}
    add_reference :chores, :hideout, null: false, foreign_key: {to_table: :hideouts, on_delete: :cascade}
  end
end
