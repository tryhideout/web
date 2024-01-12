require_relative 'boot'

require 'rails/all'
require 'set'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HideoutWeb
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.autoload_lib(ignore: [])

    require 'middleware/verify_access_token'
    require 'middleware/verify_users_permissions'
    require 'middleware/verify_hideouts_permissions'
    require 'middleware/verify_chores_permissions'
    require 'middleware/verify_expenses_permissions'
    require 'constants'

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', Constants::LOCAL_ENV_YAML_FILE)
      YAML.load(File.open(env_file)).each { |key, value| ENV[key.to_s] = value } if File.exist?(env_file)
      ENV['API_BASE_URL'] = Constants::LOCALHOST_API_URL if Rails.env == Constants::ENVIRONMENTS[:DEVELOPMENT]
    end

    config.middleware.use Middleware::VerifyAccessToken
    config.middleware.use Middleware::VerifyUsersPermissions
    config.middleware.use Middleware::VerifyHideoutsPermissions
    config.middleware.use Middleware::VerifyChoresPermissions
    config.middleware.use Middleware::VerifyExpensesPermissions
    config.middleware.use ActionDispatch::Cookies
  end
end
