require 'net/http'
require 'uri'
require 'json'

require_relative '../helpers/auth_helper.rb'
require_relative '../helpers/response_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class SessionsController < ApplicationController
  @@firebase_login_URI =
    URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{ENV['FIREBASE_API_KEY']}")

  def verify
    refresh_token = cookies[:refresh_token]
    result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
    return render status: 401 if not result[:success]
    return render status: 200
  end

  def create
    begin
      params.require(%i[email password])
      email = params[:email]
      password = params[:password]

      response = Net::HTTP.post_form(@@firebase_login_URI, email: email, password: password)
      raise StandardError if response.code == '400'

      current_user = User.find_by!(email: email)

      refresh_token = AuthHelper.generate_token_by_type(:REFRESH, current_user.as_json)
      access_token = AuthHelper.generate_token_by_type(:ACCESS, current_user.as_json)
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
      return render status: 400
    rescue StandardError
      return render status: 401
    end
  end

  def refresh
    begin
      refresh_token = cookies[:refresh_token]
      return render status: 400 if refresh_token.nil?

      result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
      return render status: 401 if not result[:success]

      user_id = result[:payload]['id']
      current_user = User.find_by!(id: user_id)

      access_token = AuthHelper.generate_token_by_type(:ACCESS, current_user.as_json)

      response_json = { access_token: access_token }

      return render status: 200, json: response_json.to_json
    rescue ActiveRecord::RecordNotFound
      return render status: 404, json: ResponseHelper.generate_error_response('User not found')
    end
  end

  def destroy
    refresh_token = cookies[:refresh_token]
    return render status: 400 if refresh_token.nil?

    cookies[:refresh_token] = {
      value: nil,
      expires: Time.at(0),
      secure: true,
      httponly: true,
      same_site: Rails.env == 'development' ? :None : :Strict,
    }
    return render status: 204
  end
end
