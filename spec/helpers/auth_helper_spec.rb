require 'rails_helper'

RSpec.describe AuthHelper, type: :helper do
  describe '.generate_token_by_type' do
    let(:payload) { { data: 'test' } }

    it 'generates a refresh token with correct expiry' do
      token = AuthHelper.generate_token_by_type(:REFRESH, payload)
      decoded_token = JWT.decode(token, ENV['REFRESH_TOKEN_SECRET'], true, algorithm: 'HS256')
      expect(decoded_token[0]['data']).to eq('test')
      expect(decoded_token[0]['exp']).to be_within(5).of(Time.now.to_i + 2_592_000)
    end

    it 'generates an access token with correct expiry' do
      token = AuthHelper.generate_token_by_type(:ACCESS, payload)
      decoded_token = JWT.decode(token, ENV['ACCESS_TOKEN_SECRET'], true, algorithm: 'HS256')
      expect(decoded_token[0]['data']).to eq('test')
      expect(decoded_token[0]['exp']).to be_within(5).of(Time.now.to_i + 900)
    end
  end

  describe '.validate_token_by_type' do
    let(:payload) { { data: 'test', exp: Time.now.to_i + 900 } }
    let(:token) { JWT.encode(payload, ENV['ACCESS_TOKEN_SECRET'], 'HS256') }

    it 'validates a valid token' do
      result = AuthHelper.validate_token_by_type(:ACCESS, token)
      expect(result[:payload]['data']).to eq('test')
      expect(result[:success]).to be true
    end

    it 'raises an exception for an invalid token' do
      expect { AuthHelper.validate_token_by_type(:ACCESS, 'invalid.token') }.to raise_error(
        Exceptions::JWTException,
        'Invalid access token.',
      )
    end
  end

  describe '.validate_firebase_social_token' do
    let(:token) { 'valid.firebase.token' }
    let(:header) { { 'kid' => 'somekid' } }
    let(:cert) { OpenSSL::X509::Certificate.new }
    let(:public_key) { cert.public_key }

    before do
      key = OpenSSL::PKey::RSA.new(2048)
      cert = OpenSSL::X509::Certificate.new
      cert.subject = cert.issuer = OpenSSL::X509::Name.parse('/CN=test')
      cert.not_before = Time.now
      cert.not_after = Time.now + 1 * 365 * 24 * 60 * 60 # 1 year validity
      cert.public_key = key.public_key
      cert.sign(key, OpenSSL::Digest::SHA256.new)

      allow(Base64).to receive(:decode64).with(anything).and_return(header.to_json)
      allow(Net::HTTP).to receive(:get).and_return({ 'somekid' => cert.to_pem }.to_json)
      allow(JWT).to receive(:decode).and_return([{ 'data' => 'test' }, { 'alg' => 'RS256' }])
    end

    it 'validates a valid firebase social token' do
      result = AuthHelper.validate_firebase_social_token(token)
      expect(result[:success]).to be true
    end

    it 'raises an exception for an invalid firebase social token' do
      allow(JWT).to receive(:decode).and_raise(StandardError)
      expect { AuthHelper.validate_firebase_social_token(token) }.to raise_error(
        Exceptions::JWTException,
        'Invalid social token.',
      )
    end
  end

  describe '.generate_cookie_hash' do
    let(:refresh_token) { 'refresh.token' }
    let(:cookie_hash) { AuthHelper.generate_cookie_hash(refresh_token) }

    it 'generates a secure, httponly, same_site cookie' do
      expect(cookie_hash[:value]).to eq(refresh_token)
      expect(cookie_hash[:secure]).to be true
      expect(cookie_hash[:httponly]).to be true
      expect(cookie_hash[:same_site]).to eq(Rails.env.development? ? :None : :Strict)
      expect(cookie_hash[:path]).to eq(Constants::API_PATHS[:SESSIONS_TOKEN])
    end
  end

  describe '.generate_deleted_cookie' do
    let(:deleted_cookie) { AuthHelper.generate_deleted_cookie }

    it 'generates a deleted cookie with the correct attributes' do
      expect(deleted_cookie[:value]).to be_nil
      expect(deleted_cookie[:expires]).to eq(Time.at(0))
      expect(deleted_cookie[:secure]).to be true
      expect(deleted_cookie[:httponly]).to be true
      expect(deleted_cookie[:same_site]).to eq(Rails.env.development? ? :None : :Strict)
    end
  end
end
