require 'net/http'
require 'uri'
require 'json'
require 'bcrypt'
require 'exceptions'

include ActionController::Cookies

class UsersController < ApplicationController
  @@status_values = %w[available busy away do_not_disturb]

  def show
    id = params[:id]
    user = User.find_by(id:)
    render status: :ok, json: user.jsonify
  end

  def create
    params.require(%i[first_name last_name email])
    first_name = params[:first_name]
    last_name = params[:last_name]
    email = params[:email]
    password = params[:password]
    social_token = params[:social_token]

    if password.nil? == social_token.nil?
      error_response = ResponseHelper.generate_error_response('Exactly one of social token or password must be provided.')
      return render status: :bad_request, json: error_response
    end

    AuthHelper.validate_firebase_social_token(social_token) unless social_token.nil?
    new_user = User.new_user(first_name:, last_name:, email:, password:)

    user_resource_location = ResponseHelper.generate_resource_location_url('users', new_user.id)
    response.set_header('Location', user_resource_location)

    render status: :created, json: new_user.jsonify
  rescue Exceptions::JWTException, Exceptions::ModelException => e
    render status: :unauthorized, json: ResponseHelper.generate_error_response(e.message)
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotUnique
    render status: :conflict, json: ResponseHelper.generate_error_response('User already exists.')
  end

  def update_status
    params.require(%i[status])
    id = params[:id]
    status = params[:status]

    unless @@status_values.include?(status)
      return render status: :bad_request, json: ResponseHelper.generate_error_response('Invalid user status provided')
    end

    user = User.find_by(id:)
    user.update(status:)

    user_statuses = User.get_all_statuses_by_hideout_id(hideout_id: user.hideout_id)
    channel_name = 'statuses:' + user.hideout_id.to_s
    ActionCable.server.broadcast(channel_name, user_statuses.to_json)
    render status: :ok
  end
end
