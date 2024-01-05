require 'exceptions'

class ChoresController < ApplicationController
  def show
    id = params[:id]
    chore = Chore.find_by(id: id)
    return render status: :ok, json: chore.to_json
  end

  def create
    begin
      params.require(%i[name hideout_id status])
      name, description, assignee_id, hideout_id, due_date, status =
        params[:name],
        params[:description],
        params[:assignee_id],
        params[:hideout_id],
        params[:due_date],
        params[:status]

      chore =
        Chore.new_chore(
          name: name,
          description: description,
          assignee_id: assignee_id,
          hideout_id: hideout_id,
          due_date: due_date,
          status: status,
        )

      chore_resource_location = ResponseHelper.generate_resource_location_url('chores', chore.id)
      response.set_header('Location', chore_resource_location)

      return render status: 201, json: chore.jsonify
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found.')
    end
  end

  def update
    begin
      params.require(%i[name description hideout_id status])

      name, description, assignee_id, due_date, status =
        params[:name],
        params[:description],
        params[:assignee_id],
        params[:due_date],
        params[:status]

      chore = Chore.find_by(id: id)
      chore.update_chore(name: name, description: description, assignee_id: assignee_id, due_date: due_date, status: status)

      return render status: :ok, json: chore.jsonify
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found.')
    end
  end

  def destroy
    id = params[:id]
    chore = Chore.find_by(id: id)
    chore.destroy
    return render status: :no_content
  end
end
