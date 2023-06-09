require_relative 'boot'
require_relative '../lib/middleware/verify_access_token.rb'
require_relative '../lib/middleware/verify_user_permissions.rb'

require 'rails/all'
require 'set'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HideoutWeb
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each { |key, value| ENV[key.to_s] = value } if File.exist?(env_file)
      ENV['PUBLIC_ROUTES'] = 'GET /api/health, POST /api/users, POST /api/sessions, PUT /api/sessions, DELETE /api/sessions'
    end

    config.middleware.use Middleware::VerifyAccessToken
    config.middleware.use Middleware::VerifyUserPermissions
    config.middleware.use ActionDispatch::Cookies
  end
end
