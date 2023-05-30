require 'jwt'

module AuthHelper
  def generate_token_by_type(type, payload)
    if type == :ACCESS
      expiry = Time.now.to_i + 2_592_000
    else
      secret = expiry = Time.now.to_i + 3600
    end

    payload[:exp] = expiry
    token = JWT.encode(payload, ENV[:"#{type}_TOKEN_SECRET"], :HS256)
    return token
  end

  def validate_token_by_type(type, payload)
    begin
      decoded_token = JWT.decode(ENV[:"#{type}_TOKEN_SECRET"], secret, true, { algorithm: :HS256 })
      return { payload: decoded_token[0], success: true }
    rescue StandardError
      return { payload: nil, success: false }
    end
  end
end
