class AddHideoutColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :hideout, null: true, foreign_key: { to_table: :hideouts, on_delete: :nullify }
  end
end
