require 'net/http'
require 'uri'
require 'json'
require 'bcrypt'

require_relative '../helpers/auth_helper.rb'
require_relative '../helpers/response_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class SessionsController < ApplicationController

  def verify
    refresh_token = cookies[:refresh_token]
    result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
    return render status: :unauthorized if not result[:success]
    return render status: :ok
  end

  def create
    begin
      params.require(%i[email])
      email = params[:email]
      password = params[:password]
      social_token = params[:social_token]

      user = User.find_by!(email: email)
      return render status: :bad_request if password.nil? == social_token.nil?

      hashed_password = nil
      if !social_token.nil?
        result = AuthHelper.validate_firebase_social_token(social_token)
        return render status: :unauthorized if !result[:success]
      else
        hashed_password = BCrypt::Password.create(password)
        return render status: :unauthorized if hashed_password != password
      end

      user_hash = user.as_json
      user_hash.delete('password')

      refresh_token = AuthHelper.generate_token_by_type(:REFRESH, user_hash)
      access_token = AuthHelper.generate_token_by_type(:ACCESS, user_hash)
      cookies[:refresh_token] = {
        value: refresh_token,
        expires: 1.month,
        secure: true,
        httponly: true,
        same_site: Rails.env == 'development' ? :None : :Strict,
      }

      response_json = { access_token: access_token }

      return render status: 201, json: response_json.to_json
    rescue ActionController::ParameterMissing
      return render status: :bad_request
    rescue ActiveRecord::RecordNotFound
      return render status: :unauthorized
    end
  end

  def refresh
    begin
      refresh_token = cookies[:refresh_token]
      return render status: :bad_request if refresh_token.nil?

      result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
      return render status: :unauthorized if not result[:success]

      user_id = result[:payload]['id']
      user = User.find_by!(id: user_id)

      user_hash = user.as_json
      user_hash.delete('password')

      access_token = AuthHelper.generate_token_by_type(:ACCESS, user_hash)

      response_json = { access_token: access_token }

      return render status: :ok, json: response_json.to_json
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('User not found')
    end
  end

  def destroy
    refresh_token = cookies[:refresh_token]
    return render status: :bad_request if refresh_token.nil?

    cookies[:refresh_token] = {
      value: nil,
      expires: Time.at(0),
      secure: true,
      httponly: true,
      same_site: Rails.env == 'development' ? :None : :Strict,
    }
    return render status: :no_content
  end
end
