require 'net/http'
require 'uri'
require 'json'
require 'bcrypt'
require 'exceptions'

include ActionController::Cookies

class UsersController < ApplicationController
  def show
    id = params[:id]
    user = User.find_by(id: id)
    return render status: :ok, json: user.jsonify
  end

  def create
    begin
      params.require(%i[first_name last_name email])
      first_name, last_name, email, password, social_token =
        params[:first_name],
        params[:last_name],
        params[:email],
        params[:password],
        params[:social_token]

      if password.nil? == social_token.nil?
        error_response = ResponseHelper.generate_error_response('Exactly one of social token or password must be provided.')
        return render status: :bad_request, json: error_response
      end

      AuthHelper.validate_firebase_social_token(social_token) if !social_token.nil?
      new_user = User.new_user(first_name: first_name, last_name: last_name, email: email, password: password)

      user_resource_location = ResponseHelper.generate_resource_location_url('users', new_user.id)
      response.set_header('Location', user_resource_location)

      return render status: :created, json: new_user.jsonify
    rescue Exceptions::JWTException, Exceptions::ModelException => error
      return render status: :unauthorized, json: ResponseHelper.generate_error_response(error.message)
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    rescue ActiveRecord::RecordNotUnique
      return render status: :conflict, json: ResponseHelper.generate_error_response('User already exists.')
    end
  end
end
