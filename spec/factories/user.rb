require 'faker'

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    hideout { association(:hideout) }
    color { %w[red blue purple yellow green orange].sample }
    password { 'password' }
    status { %w[available away busy do_not_disturb].sample }
  end
end
