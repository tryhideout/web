Rails.application.routes.draw do
  get '/api/health/', to: 'application#health'

  get '/api/sessions', to: 'sessions#verify'
  post '/api/sessions', to: 'sessions#create'
  get '/api/sessions/token', to: 'sessions#refresh'
  delete '/api/sessions', to: 'sessions#destroy'

  get '/api/users/:id', to: 'users#show'
  post '/api/users', to: 'users#create'
  patch '/api/users/:id', to: 'users#update_status'

  get '/api/hideouts/:id', to: 'hideouts#show'
  get '/api/hideouts/:id/users', to: 'hideouts#users'
  get '/api/hideouts/:id/chores', to: 'hideouts#chores'
  get '/api/hideouts/:id/expenses', to: 'hideouts#expenses'
  post '/api/hideouts/users', to: 'hideouts#join'
  post '/api/hideouts', to: 'hideouts#create'
  put '/api/hideouts/:id', to: 'hideouts#update'
  delete '/api/hideouts/:id/users', to: 'hideouts#leave'
  delete '/api/hideouts/:id', to: 'hideouts#destroy'

  get '/api/chores/:id', to: 'chores#show'
  post '/api/chores', to: 'chores#create'
  put '/api/chores/:id', to: 'chores#update'
  delete '/api/chores/:id', to: 'chores#destroy'

  get '/api/expenses/:id', to: 'expenses#show'
  post '/api/expenses', to: 'expenses#create'
  delete '/api/expenses/:id', to: 'expenses#destroy'
  put '/api/expenses/:id', to: 'expenses#update'

  mount ActionCable.server => '/cable'
end
