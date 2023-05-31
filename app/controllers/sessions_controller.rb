require 'net/http'
require 'uri'
require 'json'

require_relative '../helpers/auth_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class SessionsController < ApplicationController
  @@firebaseLoginURI = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{ENV['FIREBASE_API_KEY']}")

  def create
    email = params[:email]
    password = params[:password]
    refresh_token = cookies[:refresh_token]

    return render status: 400 if email.nil? || password.nil? || refresh_token.nil?

    begin
      response = Net::HTTP.post_form(@@firebaseLoginURI, email: email, password: password)
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

      response_json = current_user.as_json
      response_json[:access_token] = access_token

      render status: 201, json: response_json
    rescue StandardError
      render status: 401
    end
  end

  def update
    refresh_token = cookies[:refresh_token]
    return render status: 400 if refresh_token.nil?

    result = AuthHelper.validate_token_by_type(:REFRESH, refresh_token)
    return render status: 401 if not result[:success]

    access_token = AuthHelper.generate_token_by_type(:ACCESS, result[:payload])
    render status: 200, json: { access_token: access_token }
  end

  def destroy
    refresh_token = cookies[:refresh_token]
    return render status: 400 if refresh_token.nil?

    cookies.delete :refresh_token, domain: 'localhost'
    render status: 204
  end
end
