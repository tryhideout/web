class Chore < ActiveRecord::Base
  self.table_name = 'chores'
  enum status: { backlog: 'backlog', in_progress: 'in_progress', completed: 'completed' }
  belongs_to :hideout, foreign_key: 'hideout_id'
  belongs_to :user, foreign_key: 'assignee_id'

  validates :name, presence: true, strict: true
end
