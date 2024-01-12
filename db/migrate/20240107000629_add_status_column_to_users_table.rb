class AddStatusColumnToUsersTable < ActiveRecord::Migration[7.1]
  def up
    execute <<-SQL
      ALTER TABLE users ADD status ENUM('available', 'busy', 'away', 'do_not_disturb');
    SQL
  end
  def down
    remove_column :users, :status
  end
end
