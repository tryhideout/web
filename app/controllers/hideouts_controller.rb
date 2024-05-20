require 'exceptions'

class HideoutsController < ApplicationController
  def show
    id = params[:id]
    hideout = Hideout.find_by(id: id)
    return render status: :ok, json: hideout.jsonify
  end

  def users
    id = params[:id]
    users = User.get_all_users_by_hideout_id(hideout_id: id, jsonify: true)
    return render status: :ok, json: users.to_json
  end

  def chores
    id = params[:id]
    chores = Chore.get_all_chores_by_hideout_id(hideout_id: id)
    return render status: :ok, json: chores.to_json
  end

  def expenses
    id = params[:id]
    expenses = Expense.get_all_expenses_by_hideout_id(hideout_id: id)
    return render status: :ok, json: expenses.to_json
  end

  def create
    begin
      params.require(%i[name owner_id])
      name, owner_id, payload = params[:name], params[:owner_id], params[:payload]

      if !payload[:hideout_id].nil?
        return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout.')
      end

      hideout = Hideout.new_hideout(name: name, owner_id: owner_id)

      hideout_resource_location = ResponseHelper.generate_resource_location_url('hideouts', hideout.id)
      response.set_header('Location', hideout_resource_location)

      return render status: 201, json: hideout.jsonify
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotUnique
      hideout.destroy
      return render status: :conflict, json: ResponseHelper.generate_error_response('Resource already exists.')
    end
  end

  def join
    begin
      params.require(:join_code)
      join_code, payload = params[:join_code], params[:payload]
      user_id = payload[:id]

      if !payload[:hideout_id].nil?
        return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout.')
      end

      hideout = Hideout.find_by!(join_code: join_code)
      hideout.add_user(user_id: user_id)

      render status: :ok, json: hideout.jsonify
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Invalid join code.')
    end
  end

  def update
    begin
      params.require(%i[name owner_id])
      id, name, owner_id = params[:id], params[:name], params[:owner_id]

      hideout = Hideout.find_by(id: id)
      hideout.update_hideout_and_owner(name: name, owner_id: owner_id)

      return render status: :ok, json: hideout.to_json
    rescue ActionController::ParameterMissing,
           ActiveModel::StrictValidationFailed,
           ActiveRecord::RecordNotFound,
           Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotUnique
      return render status: :bad_request, json: ResponseHelper.generate_error_response('Owner already exists.')
    end
  end

  def leave
    begin
      id, payload = params[:id], params[:payload]
      user_id = payload[:id]

      hideout = Hideout.find_by(id: id)
      hideout.remove_user_by_id(user_id: user_id)

      return render status: :ok
    rescue Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    end
  end

  def destroy
    id = params[:id]
    hideout = Hideout.find_by(id: id)
    hideout.destroy_and_reset_users
    return render status: :no_content
  end
end
