require 'exceptions'

class Chore < ApplicationRecord
  self.table_name = 'chores'
  enum status: { backlog: 'backlog', in_progress: 'in_progress', completed: 'completed' }
  belongs_to :hideout, foreign_key: 'hideout_id'
  belongs_to :assignee, class_name: 'User', foreign_key: 'assignee_id', optional: true

  validates :name, presence: true, strict: true

  def self.new_chore(name:, description:, hideout_id:, assignee_id:, due_date:, status:)
    validate_assignee_id(assignee_id: assignee_id) if !assignee_id.nil?

    chore =
      Chore.create!(
        name: name,
        description: description,
        hideout_id: hideout_id,
        assignee_id: assignee_id,
        due_date: due_date,
        status: status,
      )
    return chore
  end

  def self.get_all_chores_by_hideout_id(hideout_id:)
    chores = Chore.where(hideout_id: hideout_id)
    return chores
  end

  def update_chore(name:, description:, assignee_id:, due_date:, status:)
    validate_assignee_id(assignee_id: assignee_id) if !assignee_id.nil?
    self.update(name: name, description: description, assignee_id: assignee_id, due_date: due_date, status: status)
  end

  private

  def self.validate_assignee_id(assignee_id:)
    assignee = User.find_by!(id: assignee_id)
    raise Exceptions::ModelException.new('Assignee not in hideout.') if assignee.hideout_id != hideout_id
  end
end
