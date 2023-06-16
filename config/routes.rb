Rails.application.routes.draw do
  get '/api/health', to: 'application#health'

  post '/api/sessions', to: 'sessions#create'
  put '/api/sessions', to: 'sessions#update'
  delete '/api/sessions', to: 'sessions#destroy'

  get '/api/users/:id', to: 'users#show'
  post '/api/users', to: 'users#create'
  put '/api/users/:id/hideouts', to: 'users#join'
  delete '/api/users/:id/hideouts', to: 'users#leave'

  post '/api/hideouts', to: 'hideout#create'
  put '/api/hideouts/:id', to: 'hideout#update'
  delete '/api/hideouts/:id', to: 'hideout#destroy'

  get '/api/chores/:id', to: 'chores#show'
  post '/api/chores', to: 'chores#create'
  put '/api/chores/:id', to: 'chores#update'
  delete '/api/chores/:id', to: 'chores#destroy'
end
