Rails.application.routes.draw do
  get '/health', to: 'application#health'

  post '/sessions', to: 'sessions#create'
  put '/sessions', to: 'sessions#update'
  delete '/sessions', to: 'sessions#destroy'

  post '/users', to: 'users#create'

  post '/hideouts', to: 'hideout#create'
  delete '/hideouts', to: 'hideout#destroy'
  put '/hideouts/rename', to: 'hideout#rename'
  put '/hideouts/users', to: 'hideout#add'
  delete '/hideouts/users', to: 'hideout#leave'
  delete '/hideouts/destroy', to: 'hideout#destroy'
end
