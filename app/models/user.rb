require 'bcrypt'
require 'exceptions'

class User < ApplicationRecord
  self.table_name = 'users'
  has_many :chores, foreign_key: 'assignee_id'
  has_many :credit_expenses, class_name: 'Expense', foreign_key: 'creditor_id'
  has_many :debt_expenses, class_name: 'Expense', foreign_key: 'debtor_id'
  belongs_to :hideout, foreign_key: 'hideout_id', optional: true
  has_one :owner, foreign_key: 'owner_id'

  validates :email, presence: true, strict: true, uniqueness: true
  validates :first_name, presence: true, strict: true
  validates :last_name, presence: true, strict: true
  validates :color, presence: true, unless: -> { hideout_id.blank? }, strict: true

  def jsonify
    hash = self.as_json
    hash.delete('password')
    return hash.to_json
  end

  def hashify
    hash = self.as_json
    hash.delete('password')
    return hash
  end

  def validate_password(password:)
    hashed_password = BCrypt::Password.create(password)
    raise Exceptions::AuthException.new('Invalid password.') if hashed_password != password
  end

  def self.get_all_users_by_hideout_id(hideout_id:)
    users = User.where(hideout_id: hideout_id).select(User.attribute_names - ['password'])
    return users
  end

  def self.new_user(first_name:, last_name:, email:, password:)
    hashed_password = password.nil? ? nil : BCrypt::Password.create(password)
    new_user = User.create!(first_name: first_name, last_name: last_name, email: email, password: hashed_password)
    return new_user
  end
end
