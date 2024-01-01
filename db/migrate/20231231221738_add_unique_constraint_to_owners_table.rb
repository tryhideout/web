class AddUniqueConstraintToOwnersTable < ActiveRecord::Migration[7.0]
  def change
    add_index :owners, :user_id, unique: true
    add_index :owners, :hideout_id, unique: true
  end
end
