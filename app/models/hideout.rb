class Hideout < ActiveRecord::Base
  self.table_name = 'hideouts'

  def self.add_user(email, hideout_id)
    user = User.find_by(email: email)
    user.hideout_id = hideout_id
    user.save
  end

  def self.remove_user(email)
    user = User.find_by(email: email)
    user.hideout_id = nil
    user.save
  end

  def self.rename(id, new_name)
    hideout = Hideout.find_by(id: id)
    hideout.name = new_name
    hideout.save
  end
end
