class CreateOwnersTable < ActiveRecord::Migration[7.0]
  def change
    create_table :owners, primary_key: %i[owner_id hideout_id] do |t|
      t.bigint :owner_id, null: false
      t.bigint :hideout_id, null: false
      t.timestamps
    end
    add_foreign_key :owners, :users, column: :owner_id, on_delete: :cascade
    add_foreign_key :owners, :hideouts, on_delete: :cascade
  end
end
