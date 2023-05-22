class Hideout < ActiveRecord::Base
    self.table_name = "hideouts"

    def self.create(owner_email, name)
        # create a hideout with the specified name and owner
        # return the hideout's code
        user = User.find_by(email: owner_email)
        new_hideout = Hideout.new(name: name, owner_id: user.id)
        new_hideout.save
        return Hideout.generate_join_code(new_hideout.id)
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

    def self.generate_join_code(id)
        # return an 8 or more digit hideout code,
        # which can be used to join the hideout with the specified id
        id_length = id.to_s(16).length
        if id_length >= 8
            return id.to_s
        end
        
        time_now = Time.now.nsec.to_s(16)
        time_prefix = time_now[..(8 - id_length - 1)]
        return time_prefix + id.to_s(16)
    end
end