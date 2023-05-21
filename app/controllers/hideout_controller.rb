class HideoutController < ApplicationController
  def create
    # Needs owner_email and name as params.
    # name must be lesser than 20 characters and greater than 3 characters
    # owner must not already be in a hideout
    # return the hideout as an object
    owner_email = params[:owner_email]
    name = params[:name]

    if !User.exists?(email: owner_email)
      render status: :not_found, body: "User does not exist"
    elsif name.length > 20
      render status :precondition_failed, body: "Hideout name greater than 20 characters"
    elsif name.length < 3
      render status: :precondition_failed, body: "Hideout name lesser than 3 characters"
    elsif !User.find_by(email: owner_email).hideout_id.nil?
      render status: :precondition_failed, body: "Owner already in hideout"
    else
      hideout_code = Hideout.create(owner_email, name)
      render status: :created, :json => {name: name, owner_email: owner_email, hideout_code: hideout_code}
    end
  end

  def destroy

    
  end

  def rename
  end

  def add
    # add user with the given email to the Hideout using the hideout id and name
    # user must not already be in a hideout
    # hideout name must be the correct
    name = params[:name]
    hideout_id = params[:id]
    email = params[:email]

    
    if !User.exists?(email: email)
      render status: :not_found, body: "User does not exist"
    elsif !Hideout.exists?(id: hideout_id)
      render status: :not_found, body: "Hideout does not exist"
    elsif !User.find_by(email: email).hideout_id.nil?
      render status: :precondition_failed, body: "User already in hideout"
    elsif Hideout.find_by(id: hideout_id).name != name
      render status: :precondition_failed, body: "Mismatch between name and id"      
    else
      Hideout.add_user(email)
      render status: :ok
    end
  end

end
