class ChoresController < ApplicationController
  def show
    id = params[:id]
    chore = Chore.find_by(id: id)
    return render status: :ok, json: chore.to_json
  end

  def create
    begin
      params.require(%i[name description hideout_id status])

      name = params[:name]
      description = params[:description]
      assignee_id = params[:assignee_id]
      hideout_id = params[:hideout_id]
      due_date = params[:due_date]
      status = params[:status]

      if !assignee_id.nil?
        assignee = User.find_by!(id: params[:assignee_id])
        if assignee.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Assignee not in hideout')
        end
      end

      chore =
        Chore.create(
          name: name,
          description: description,
          hideout_id: hideout_id,
          assignee_id: assignee_id,
          due_date: due_date,
          status: status,
        )

      chore_resource_location = ResponseHelper.generate_resource_location_url('chores', chore.id)
      response.set_header('Location', chore_resource_location)

      return render status: 201, json: chore.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found')
    end
  end

  def update
    begin
      params.require(%i[name description hideout_id status])

      id = params[:id]
      name = params[:name]
      hideout_id = params[:hideout_id]
      description = params[:description]
      assignee_id = params[:assignee_id]
      due_date = params[:due_date]
      status = params[:status]

      if !assignee_id.nil?
        assignee = User.find_by!(id: assignee_id)
        if assignee.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Assignee not in hideout')
        end
      end

      chore = Chore.find_by(id: id)
      chore.update(name: name, description: description, assignee_id: assignee_id, due_date: due_date, status: status)
      return render status: :ok, json: chore.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Assignee not found')
    end
  end

  def destroy
    id = params[:id]
    chore = Chore.find_by(id: params[:id])
    chore.destroy
    return render status: :ok
  end
end
