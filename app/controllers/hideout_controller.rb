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
    elsif name.length > 20 or name.length < 3
      render status: 400, body: "Bad Request"
    elsif !User.find_by(email: owner_email).hideout_id.nil?
      render status: :precondition_failed, body: "Owner already in hideout"
    else
      join_code = Hideout.create(owner_email, name)
      render status: :created, :json => {name: name, owner_email: owner_email, join_code: join_code}
    end
  end

  def destroy
    hideout_id = params[:hideout_id]
    issued_by_email = params[:user_email]

    if !Hideout.exists?(id: hideout_id)
      render status: :not_found, body: "Resource not found"
    elsif !User.exists?(email: issued_by_email)
      render status: :not_found, body: "Resource not found"
    elsif Hideout.find_by(id: hideout_id).owner_id != User.find_by(email: issued_by_email).id
    render status: :forbidden, body: "Forbidden"
    else 
      Hideout.destroy(hideout_id)
      render status: :ok
    end
  end

  def rename
    hideout_id = params[:hideout_id]
    issued_by_email = params[:user_email]
    new_name = params[:new_name]

    if !Hideout.exists?(id: hideout_id)
      render status: :not_found, body: "Hideout does not exist"
    elsif !User.exists?(email: issued_by_email)
      render status: :not_found, body: "User does not exist"
    elsif Hideout.find_by(id: hideout_id).owner_id != User.find_by(email: issued_by_email).id
    render status: :forbidden, body: "User is not the Hideout owner"
    else 
      Hideout.rename(hideout_id, new_name)
      render status: :ok
    end
  end

  def add
    # add user with the given email to the Hideout using the hideout code
    # user must not already be in a hideout
    # hideout name must be the correct
    join_code = params[:join_code]
    email = params[:email]
    
    if !User.exists?(email: email)
      render status: :not_found, body: "User does not exist"
    elsif !Hideout.exists?(join_code: join_code)
      render status: :not_found, body: "Hideout does not exist"
    elsif !User.find_by(email: email).hideout_id.nil?
      render status: :precondition_failed, body: "User already in hideout"
    else
      hideout_id = Hideout.find_by(join_code: join_code).id
      Hideout.add_user(email, id)
      render status: :ok
    end
  end

  def leave
    # make the user leave the hideout
    # user must be in a hideout
    email = params[:email]

    if !User.exists?(email: email)
      render status: :not_found, body: "User does not exist"
    elsif User.find_by(email: email).hideout_id.nil?
      render status: :precondition_failed, body: "User is not in a hideout"
    else
      Hideout.remove_user(email)
      render status: :ok
    end
  end 

end
