# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_240_107_000_629) do
  create_table 'chores', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'description'
    t.datetime 'due_date'
    t.bigint 'assignee_id'
    t.bigint 'hideout_id', null: false
    t.column 'status', "enum('backlog','in_progress','completed')", default: 'backlog', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['assignee_id'], name: 'index_chores_on_assignee_id'
    t.index ['hideout_id'], name: 'index_chores_on_hideout_id'
    t.index ['status'], name: 'index_chores_on_status'
  end

  create_table 'expenses', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name', null: false
    t.bigint 'amount', null: false
    t.datetime 'due_date'
    t.bigint 'debtor_id'
    t.bigint 'hideout_id', null: false
    t.string 'comments', limit: 100
    t.bigint 'creditor_id'
    t.boolean 'active', default: true, null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['creditor_id'], name: 'index_expenses_on_creditor_id'
    t.index ['debtor_id'], name: 'index_expenses_on_debtor_id'
    t.index ['hideout_id'], name: 'index_expenses_on_hideout_id'
  end

  create_table 'hideouts', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'join_code'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['join_code'], name: 'index_hideouts_on_join_code', unique: true
  end

  create_table 'owners', primary_key: %w[user_id hideout_id], charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci',
                         force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'hideout_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['hideout_id'], name: 'index_owners_on_hideout_id', unique: true
    t.index ['user_id'], name: 'index_owners_on_user_id', unique: true
  end

  create_table 'users', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'email', null: false
    t.string 'first_name', null: false
    t.string 'last_name', null: false
    t.bigint 'hideout_id'
    t.column 'color', "enum('red','blue','purple','yellow','green','orange')"
    t.string 'password'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.column 'status', "enum('available','busy','away','do_not_disturb')"
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['hideout_id'], name: 'index_users_on_hideout_id'
  end

  add_foreign_key 'chores', 'hideouts', on_delete: :cascade
  add_foreign_key 'chores', 'users', column: 'assignee_id', on_delete: :nullify
  add_foreign_key 'expenses', 'hideouts', on_delete: :cascade
  add_foreign_key 'expenses', 'users', column: 'creditor_id', on_delete: :nullify
  add_foreign_key 'expenses', 'users', column: 'debtor_id', on_delete: :nullify
  add_foreign_key 'owners', 'hideouts', on_delete: :cascade
  add_foreign_key 'owners', 'users', on_delete: :cascade
  add_foreign_key 'users', 'hideouts', on_delete: :nullify
end
