class HideoutController < ApplicationController
  def create
    # Needs owner_email and name as params.
    # name must be lesser than 20 characters and greater than 3 characters
    # owner must not already be in a hideout
    # return the hideout as an object
    owner_email = params[:owner_email]
    name = params[:name]

    if !User.exists?(email: owner_email)
      render status :not_found, body: "User does not exist"
    elsif name.length > 20
      render status :precondition_failed, body: "Hideout name greater than 20 characters"
    elsif name.length < 3
      render status :precondition_failed, body: "Hideout name lesser than 3 characters"
    elsif !User.find_by(email: owner_email).hideout_id.nil?
      render status :precondition_failed, body: "Owner already in hideout"
    else
      user = User.find_by(email: owner_email)
      new_hideout = Hideout.new(name: name, owner_id: user.id)
      new_hideout.save
      hideout_code = generate__hideout_code(name, user.id)
      render status: :created, :json => {name: name, owner_email: owner_email, hideout_code: hideout_code}
    end
  end

  def destroy

  end

  def rename
  end

  private

  def generate_hideout_code(name, id)
    # return a unique hideout code representing the hideout with the specified name and id
    return name + "#" + id.to_s(16)
  end

end
