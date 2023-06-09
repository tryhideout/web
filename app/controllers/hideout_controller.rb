require_relative '../helpers/hideout_helper.rb'

class HideoutController < ApplicationController
  def create
    begin
      params.require(%i[name owner_id])

      payload = params[:payload]
      name = params[:name]
      owner_id = params[:owner_id]

      return render status: 400 if name.length > 20 or name.length < 3
      return render status: 400, body: 'User Already In Hideout' if !payload[:hideout_id].nil?

      hideout = Hideout.create(owner_id: owner_id, name: name)
      join_code = HideoutHelper.generate_join_code(hideout.id)
      hideout.update(join_code: join_code)

      owner = User.find_by(id: owner_id)
      owner.update(hideout_id: hideout.id)

      return render status: 201, json: hideout.as_json
    rescue ActionController::ParameterMissing
      return render status: 400
    end
  end

  def update
    # check that user is owner
    begin
      params.require(%i[name owner_id])
      id = params[:id]
      name = params[:name]
      owner_id = params[:owner_id]

      hideout = Hideout.find_by(id: id)
      hideout.update(name: name, owner_id: owner_id)

      return render status: 200, json: hideout.as_json
    rescue ActionController::ParameterMissing
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404, body: 'Owner Not Found'
    rescue ActiveRecord::RecordNotUnique
      return render status: 400, body: 'Owner Already Exists'
    end
  end

  def destroy
    # check that user is owner
    id = params[:id]
    hideout = Hideout.find_by(id: id)
    hideout.destroy
    return render status: 200
  end
end
