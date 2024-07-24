require 'bcrypt'
require 'exceptions'

class User < ApplicationRecord
  self.table_name = 'users'

  has_many :chores, foreign_key: 'assignee_id'
  has_many :credit_expenses, class_name: 'Expense', foreign_key: 'creditor_id'
  has_many :debt_expenses, class_name: 'Expense', foreign_key: 'debtor_id'
  belongs_to :hideout, optional: true
  has_one :owner, foreign_key: 'owner_id'

  validates :email, presence: true, strict: true
  validates :first_name, presence: true, strict: true
  validates :last_name, presence: true, strict: true
  validates :color, presence: true, unless: -> { hideout_id.blank? }, strict: true

  def jsonify
    hash = as_json
    hash.delete('password')
    hash.to_json
  end

  def hashify
    hash = as_json
    hash.delete('password')
    hash
  end

  def validate_password(password:)
    stored_password = BCrypt::Password.new(self.password)
    raise Exceptions::AuthException.new('Invalid password.') if stored_password != password
  end

  def self.get_all_users_by_hideout_id(hideout_id:)
    User.where(hideout_id:).select(User.attribute_names - ['password'])
  end

  def self.new_user(first_name:, last_name:, email:, password:)
    hashed_password = password.nil? ? nil : BCrypt::Password.create(password)
    User.create!(first_name:, last_name:, email:, password: hashed_password)
  end

  def self.get_all_statuses_by_hideout_id(hideout_id:)
    User.where(hideout_id:).select(%w[id status])
  end
end
