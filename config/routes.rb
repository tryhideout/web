Rails.application.routes.draw do
  get '/api/health', to: 'application#health'

  post '/api/sessions', to: 'sessions#create'
  put '/api/sessions', to: 'sessions#update'
  delete '/api/sessions', to: 'sessions#destroy'

  post '/api/users', to: 'users#create'

  post '/api/hideouts', to: 'hideout#create'
  delete '/api/hideouts', to: 'hideout#destroy'
  put '/api/hideouts/api/rename', to: 'hideout#rename'
  put '/api/hideouts/api/users', to: 'hideout#add'
  delete '/api/hideouts/api/users', to: 'hideout#leave'
  delete '/api/hideouts/api/destroy', to: 'hideout#destroy'

  post '/api/chores', to: 'chores#create'
  put '/api/chores/:id', to: 'chores#update'
  delete '/api/chores/:id', to: 'chores#destroy'
  
end
