class AddStatusColumnToChores < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE chores ADD status ENUM('backlog', 'in_progress', 'completed') NOT NULL DEFAULT 'backlog';
    SQL
    add_index :chores, :status
  end

  def down
    remove_column :chores, :status
  end
end
