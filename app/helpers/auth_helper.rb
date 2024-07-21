require 'jwt'
require 'net/http'
require 'base64'
require 'json'
require 'openssl'
require 'constants'

module AuthHelper
  def self.generate_token_by_type(type, payload)
    expiry = if type == :REFRESH
               Time.now.to_i + 2_592_000
             else
               expiry = Time.now.to_i + 900
             end

    payload[:exp] = expiry
    JWT.encode(payload, ENV["#{type}_TOKEN_SECRET"], 'HS256')
  end

  def self.validate_token_by_type(type, token)
    decoded_token = JWT.decode(token, ENV["#{type}_TOKEN_SECRET"], true, { algorithm: 'HS256' })
    { payload: decoded_token[0], success: true }
  rescue StandardError
    raise Exceptions::JWTException.new("Invalid #{type.downcase} token.")
  end

  def self.validate_firebase_social_token(token)
    header64 = token.split('.')[0]
    header = JSON.parse(Base64.decode64(header64))

    google_public_key_URI = URI('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com')
    response = Net::HTTP.get(google_public_key_URI)
    response_json = JSON.parse(response)
    cert = OpenSSL::X509::Certificate.new(response_json[header['kid']])
    JWT.decode(token, cert.public_key, true, { algorithm: 'RS256' })

    { success: true }
  rescue StandardError
    raise Exceptions::JWTException.new('Invalid social token.')
  end

  def self.generate_cookie_hash(refresh_token)
    {
      value: refresh_token,
      expires: 1.month,
      secure: true,
      httponly: true,
      same_site: Rails.env.development? ? :None : :Strict,
      path: Constants::API_PATHS[:SESSIONS_TOKEN]
    }
  end

  def self.generate_deleted_cookie
    {
      value: nil,
      expires: Time.at(0),
      secure: true,
      httponly: true,
      same_site: Rails.env.development? ? :None : :Strict
    }
  end
end
