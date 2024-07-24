require 'net/http'
require 'uri'
require 'json'
require 'bcrypt'

include ActionController::Cookies

class SessionsController < ApplicationController
  def verify
    refresh_token = cookies[:refresh_token]
    AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
    render status: :ok
  rescue Exceptions::JWTException => e
    render status: :unauthorized, json: ResponseHelper.generate_error_response(e.message)
  end

  def create
    params.require(%i[email])
    email = params[:email]
    password = params[:password]
    social_token = params[:social_token]

    if password.nil? == social_token.nil?
      error_response = ResponseHelper.generate_error_response('Exactly one of social token or password must be provided.')
      return render status: :bad_request, json: error_response
    end

    user = User.find_by!(email:)
    password.nil? ? AuthHelper.validate_firebase_social_token(social_token) : user.validate_password(password:)

    refresh_token = AuthHelper.generate_token_by_type(:REFRESH, user.hashify)
    access_token = AuthHelper.generate_token_by_type(:ACCESS, user.hashify)
    cookies[:refresh_token] = AuthHelper.generate_cookie_hash(refresh_token)
    response = { user_id: user.id, access_token: }

    render status: :created, json: response.to_json
  rescue ActionController::ParameterMissing => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  rescue Exceptions::JWTException, Exceptions::AuthException => e
    render status: :unauthorized, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotFound
    render status: :not_found,
           json: ResponseHelper.generate_error_response('No user with provided email exists.')
  end

  def refresh
    refresh_token = cookies[:refresh_token]
    if refresh_token.nil?
      return render status: :bad_request,
                    json: ResponseHelper.generate_error_response('Refresh token cannot be blank.')
    end

    result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)

    user_id = result[:payload]['id']
    user = User.find_by!(id: user_id)

    access_token = AuthHelper.generate_token_by_type(:ACCESS, user.hashify)
    response = { user_id: user.id, access_token: }

    render status: :ok, json: response.to_json
  rescue Exceptions::JWTException => e
    render status: :unauthorized, json: ResponseHelper.generate_error_response(e.message)
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('User not found.')
  end

  def destroy
    refresh_token = cookies[:refresh_token]
    return render status: :bad_request if refresh_token.nil?

    cookies[:refresh_token] = AuthHelper.generate_deleted_cookie
    render status: :no_content
  end
end
