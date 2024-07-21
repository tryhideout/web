class AddColorColumnToUsers < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE users ADD color ENUM('red', 'blue', 'purple', 'yellow', 'green', 'orange');
    SQL
  end

  def down
    remove_column :users, :color
  end
end
