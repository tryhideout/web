class Hideout < ActiveRecord::Base
    self.table_name = "hideouts"

    def self.create(owner_email, name)
        # create a hideout with the specified name and owner
        # return the hideout's code
        user = User.find_by(email: owner_email)
        new_hideout = Hideout.new(name: name, owner_id: user.id)
        new_hideout.save
        return Hideout.generate_code(name, user.id)  
    end

    def self.generate_code(name, id)
        # return a unique hideout code representing the hideout with the specified name and id
        return name + id.to_s(16)
    end

    def self.add_user(email)
        user = User.find_by(email: email)
        user.hideout_id = hideout_id
        user.save
    end

    def self.remove_user(email)
        user = User.find_by(email: email)
        user.hideout_id = nil
        user.save
    end

    def self.destroy(id)
        user.find_by(id: id).destroy
    end

    def self.rename(id, new_name)
        hideout = Hideout.find_by(id: id)
        hideout.name = new_name
        hideout.save
    end
        
        

end