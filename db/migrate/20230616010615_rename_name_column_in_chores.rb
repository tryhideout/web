class RenameNameColumnInChores < ActiveRecord::Migration[7.0]
  def change
    rename_column :chores, :title, :name
  end
end
