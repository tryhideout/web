require 'net/http'
require 'uri'
require 'json'

class AuthController < ApplicationController
    def index
    end

    def uri_filler(action)
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:#{action}?key=#{ENV['FIREBASE_API_KEY']}")
    end

    def signup
        first_name = params[:first_name]
        last_name = params[:last_name]
        email = params[:email]
        password = params[:password]

        if first_name.nil? || last_name.nil? || email.nil? || password.nil?
            render status: 400
            return
        end

        # new_user = User.new(first_name: first_name, last_name: last_name, email: email)
        # new_user.save

        uri = uri_filler('signUp')
        res = Net::HTTP.post_form(uri, 'email': email, 'password': password)
        data = JSON.parse(res.body)

        if data.member?('error')
            render status: 400, body: data['error']['message']
        else
            render status: :created, :json => {'first_name': first_name, 'last_name': last_name, 'email': email}
        end
    end

    def login
        email = params[:email]
        password = params[:password]

        if email.nil? || password.nil?
            render status: 400
            return
        end

        uri = uri_filler('signInWithPassword')
        res = Net::HTTP.post_form(uri, 'email': email, 'password': password)
        data = JSON.parse(res.body)

        if data.member?('error')
            render status: 401, body: data['error']['message']
        else
            render status: 200
        end
    end

    def logout
    end
end
