require 'faker'

FactoryBot.define do
  factory :chore do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    due_date { Faker::Time.forward(days: 7) }
    hideout { association(:hideout) }
    status { %w[backlog in_progress completed].sample }
  end
end
