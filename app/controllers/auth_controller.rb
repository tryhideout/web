require 'net/http'
require 'uri'
require 'json'

class AuthController < ApplicationController
    def index
    end

    def signup
        first_name = params[:first_name]
        last_name = params[:last_name]
        email = params[:email]
        password = params[:password]

        new_user = User.new(first_name: first_name, last_name: last_name, email: email)
        new_user.save

        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{ENV['FIREBASE_API_KEY']}")
        res = Net::HTTP.post_form(uri, 'email' => email, 'password' => password)
        data = JSON.parse(res.body)

        puts User.all

        if data.member?('error')
            render status: 404
        else
            render status: :created
        end
    end

    def login
        email = params[:email]
        password = params[:password]

        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{ENV['FIREBASE_API_KEY']}")
        res = Net::HTTP.post_form(uri, 'email' => email, 'password' => password)
        data = JSON.parse(res.body)

        if data.member?('error')
            render status: 404
        else
            render data.to_json, status: 200
        end
    end

    def logout
    end
end
