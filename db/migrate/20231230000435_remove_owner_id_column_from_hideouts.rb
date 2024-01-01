class RemoveOwnerIdColumnFromHideouts < ActiveRecord::Migration[7.0]
  def change
    remove_column :hideouts, :owner_id
  end
end
