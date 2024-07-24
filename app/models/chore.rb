require 'exceptions'

class Chore < ApplicationRecord
  self.table_name = 'chores'
  belongs_to :hideout
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, presence: true, strict: true
  validates :status, presence: true, strict: true

  def self.new_chore(name:, description:, hideout_id:, assignee_id:, due_date:, status:)
    validate_assignee_id(assignee_id:) unless assignee_id.nil?

    Chore.create!(
      name:,
      description:,
      hideout_id:,
      assignee_id:,
      due_date:,
      status:
    )
  end

  def self.get_all_chores_by_hideout_id(hideout_id:)
    Chore.where(hideout_id:)
  end

  def update_chore(name:, description:, assignee_id:, due_date:, status:)
    validate_assignee_id(assignee_id:) unless assignee_id.nil?
    update(name:, description:, assignee_id:, due_date:, status:)
  end

  def self.validate_assignee_id(assignee_id:)
    assignee = User.find_by!(id: assignee_id)
    raise Exceptions::ModelException.new('Assignee not in hideout.') if assignee.hideout_id != hideout_id
  end
end
