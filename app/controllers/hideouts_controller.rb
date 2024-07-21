require 'exceptions'

class HideoutsController < ApplicationController
  def show
    id = params[:id]
    hideout = Hideout.find_by(id:)
    render status: :ok, json: hideout.jsonify
  end

  def users
    id = params[:id]
    users = User.get_all_users_by_hideout_id(hideout_id: id, jsonify: true)
    render status: :ok, json: users.to_json
  end

  def chores
    id = params[:id]
    chores = Chore.get_all_chores_by_hideout_id(hideout_id: id)
    render status: :ok, json: chores.to_json
  end

  def expenses
    id = params[:id]
    expenses = Expense.get_all_expenses_by_hideout_id(hideout_id: id)
    render status: :ok, json: expenses.to_json
  end

  def create
    params.require(%i[name owner_id])
    name = params[:name]
    owner_id = params[:owner_id]
    payload = params[:payload]

    unless payload[:hideout_id].nil?
      return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout.')
    end

    hideout = Hideout.new_hideout(name:, owner_id:)

    hideout_resource_location = ResponseHelper.generate_resource_location_url('hideouts', hideout.id)
    response.set_header('Location', hideout_resource_location)

    render status: :created, json: hideout.jsonify
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotUnique
    hideout.destroy
    render status: :conflict, json: ResponseHelper.generate_error_response('Resource already exists.')
  end

  def join
    params.require(:join_code)
    join_code = params[:join_code]
    payload = params[:payload]
    user_id = payload[:id]

    unless payload[:hideout_id].nil?
      return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout.')
    end

    hideout = Hideout.find_by!(join_code:)
    hideout.add_user(user_id:)

    render status: :ok, json: hideout.jsonify
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('Invalid join code.')
  end

  def update
    params.require(%i[name owner_id])
    id = params[:id]
    name = params[:name]
    owner_id = params[:owner_id]

    hideout = Hideout.find_by(id:)
    hideout.update_hideout_and_owner(name:, owner_id:)

    render status: :ok, json: hideout.to_json
  rescue ActionController::ParameterMissing,
         ActiveModel::StrictValidationFailed,
         ActiveRecord::RecordNotFound,
         Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotUnique
    render status: :bad_request, json: ResponseHelper.generate_error_response('Owner already exists.')
  end

  def leave
    id = params[:id]
    payload = params[:payload]
    user_id = payload[:id]

    hideout = Hideout.find_by(id:)
    hideout.remove_user_by_id(user_id:)

    render status: :ok
  rescue Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  end

  def destroy
    id = params[:id]
    hideout = Hideout.find_by(id:)
    hideout.destroy_and_reset_users
    render status: :no_content
  end
end
