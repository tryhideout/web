class RenameOwnersIdToUserIdInOwners < ActiveRecord::Migration[7.0]
  def change
    rename_column :owners, :owner_id, :user_id
  end
end
