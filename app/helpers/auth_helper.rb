require 'jwt'

module AuthHelper
  def AuthHelper.generate_token_by_type(type, payload)
    if type == :REFRESH
      expiry = Time.now.to_i + 2_592_000
    else
      secret = expiry = Time.now.to_i + 900
    end

    payload[:exp] = expiry
    token = JWT.encode(payload, ENV["#{type}_TOKEN_SECRET"], 'HS256')
    return token
  end

  def AuthHelper.validate_token_by_type(type, token)
    begin
      decoded_token = JWT.decode(token, ENV["#{type}_TOKEN_SECRET"], true, { algorithm: 'HS256' })
      return { payload: decoded_token[0], success: true }
    rescue StandardError
      return { payload: nil, success: false }
    end
  end
end
