require 'exceptions'

class Hideout < ApplicationRecord
  self.table_name = 'hideouts'
  @@hideout_colors = %w[red blue purple yellow green orange]

  has_many :chores, foreign_key: 'hideout_id'
  has_many :expenses, foreign_key: 'hideout_id'
  has_many :users, foreign_key: 'hideout_id'
  has_one :owner, foreign_key: 'hideout_id'

  validates :name, presence: true, strict: true

  def jsonify
    owner = Owner.find_by(hideout_id: self.id)
    json = self.as_json
    json[:owner_id] = owner.user_id
    return json.to_json
  end

  def self.new_hideout(name:, owner_id:)
    hideout = Hideout.create!(name: name)
    join_code = HideoutHelper.generate_join_code(hideout.id).upcase
    hideout.update(join_code: join_code)

    Owner.create(hideout_id: hideout.id, user_id: owner_id)

    user = User.find_by(id: owner_id)
    user.update(color: @@hideout_colors.sample)
    user.update(status: 'available')
    user.update(hideout_id: hideout.id)
    return hideout
  end

  def add_user(user_id:)
    user = User.find_by(id: user_id)
    roommates = User.select(:color).where(['hideout_id = :hideout_id', { hideout_id: self.id }])
    raise Exceptions::ModelException.new('Hideout member limit reached.') if roommates.length() == 6

    used_colors = roommates.collect { |user| user.color }
    usable_colors = @@hideout_colors - used_colors
    user.update(color: usable_colors.sample)
    user.update(status: 'available')
    user.update(hideout_id: self.id)
  end

  def update_hideout_and_owner(name:, owner_id:)
    owner = Owner.find_by(hideout_id: self.id)
    user = User.find_by!(id: owner_id)

    raise Exception::ModelException.new('Owner not in hideout.') if user.hideout_id != self.id
    owner.update(user_id: owner_id)
    self.update(name: name)
  end

  def remove_user_by_id(user_id:)
    user = User.find_by(id: user_id)
    owner = Owner.find_by(hideout_id: self.id)
    raise Exceptions::ModelException.new('Owner cannot leave hideout.') if owner.user_id == user_id

    user.update(hideout_id: nil, color: nil, status: nil)
    Chore.where(assignee_id: user.id).update_all(assignee_id: nil)
    Expense.where(debtor_id: user.id).update_all(debtor_id: nil)
    Expense.where(creditor_id: user.id).update_all(creditor_id: nil)
  end

  def destroy_and_reset_users
    User.where(hideout_id: self.id).update_all(color: nil, status: nil)
    self.destroy
  end
end
