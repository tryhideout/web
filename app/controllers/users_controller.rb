require 'net/http'
require 'uri'
require 'json'
require 'bcrypt'

require_relative '../helpers/auth_helper.rb'
require_relative '../helpers/response_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class UsersController < ApplicationController

  def show
    id = params[:id]
    user = User.find_by(id: id)
    user_hash = user.as_json
    user_hash.delete('password')
    return render status: :ok, json: user_hash.to_json
  end

  def create
    begin
      params.require(%i[first_name last_name email])
      first_name = params[:first_name]
      last_name = params[:last_name]
      email = params[:email]
      password = params[:password]
      social_token = params[:social_token]

      return render status: :bad_request if password.nil? == social_token.nil?

      hashed_password = nil
      if !social_token.nil?
        result = AuthHelper.validate_firebase_social_token(social_token)
        return render status: :unauthorized if !result[:success]
      else
        hashed_password = BCrypt::Password.create(password)
      end

      new_user = User.create!(first_name: first_name, last_name: last_name, email: email, password: hashed_password)

      user_resource_location = ResponseHelper.generate_resource_location_url('users', new_user.id)
      response.set_header('Location', user_resource_location)

      user_hash = new_user.as_json
      user_hash.delete('password')

      render status: :created, json: user_hash.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    rescue ActiveRecord::RecordNotUnique
      return render status: :bad_request, json: ResponseHelper.generate_error_response('User already exists')
    end
  end
end
