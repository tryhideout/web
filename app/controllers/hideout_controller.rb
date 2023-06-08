require_relative '../helpers/hideout_helper.rb'

class HideoutController < ApplicationController
  def create
    begin
      params.require(:name)

      payload = params[:payload]
      name = params[:name]
      owner_id = payload[:id]

      return render status: 400 if name.length > 20 or name.length < 3
      return render status: 400, body: 'User Already In Hideout' if !payload[:hideout_id].nil?

      hideout = Hideout.create(owner_id: owner_id, name: name)
      join_code = HideoutHelper.generate_join_code(hideout.id)
      hideout.update(join_code: join_code)

      owner = User.find_by(id: owner_id)
      owner.update(hideout_id: hideout.id)

      render status: :created, json: hideout.as_json
    rescue ActionController::ParameterMissing
      render status: 400
    end
  end

  def destroy
    hideout_id = params[:hideout_id]
    issued_by_email = params[:user_email]

    if !Hideout.exists?(id: hideout_id)
      render status: :not_found, body: 'Resource not found'
    elsif !User.exists?(email: issued_by_email)
      render status: :not_found, body: 'Resource not found'
    elsif Hideout.find_by(id: hideout_id).owner_id != User.find_by(email: issued_by_email).id
      render status: :forbidden, body: 'Forbidden'
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
      render status: :not_found, body: 'Hideout does not exist'
    elsif !User.exists?(email: issued_by_email)
      render status: :not_found, body: 'User does not exist'
    elsif Hideout.find_by(id: hideout_id).owner_id != User.find_by(email: issued_by_email).id
      render status: :forbidden, body: 'User is not the Hideout owner'
    else
      Hideout.rename(hideout_id, new_name)
      render status: :ok
    end
  end
end
