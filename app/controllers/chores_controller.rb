require 'exceptions'

class ChoresController < ApplicationController
  def show
    id = params[:id]
    chore = Chore.find_by(id:)
    render status: :ok, json: chore.to_json
  end

  def create
    params.require(%i[name hideout_id status])
    name = params[:name]
    description = params[:description]
    assignee_id = params[:assignee_id]
    hideout_id = params[:hideout_id]
    due_date = params[:due_date]
    status = params[:status]

    chore =
      Chore.new_chore(
        name:,
        description:,
        assignee_id:,
        hideout_id:,
        due_date:,
        status:
      )

    chore_resource_location = ResponseHelper.generate_resource_location_url('chores', chore.id)
    response.set_header('Location', chore_resource_location)

    render status: :created, json: chore.jsonify
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found.')
  end

  def update
    params.require(%i[name description hideout_id status])

    name = params[:name]
    description = params[:description]
    assignee_id = params[:assignee_id]
    due_date = params[:due_date]
    status = params[:status]

    chore = Chore.find_by(id:)
    chore.update_chore(name:, description:, assignee_id:, due_date:,
                       status:)

    render status: :ok, json: chore.jsonify
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found.')
  end

  def destroy
    id = params[:id]
    chore = Chore.find_by(id:)
    chore.destroy
    render status: :no_content
  end
end
