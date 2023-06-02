class AddJoinCodeToHideouts < ActiveRecord::Migration[7.0]
  def change
    add_column :hideouts, :join_code, :string
    add_index :hideouts, :join_code, unique: true
  end
end
