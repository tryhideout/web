Rails.application.routes.draw do
  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"

  post '/hideouts', to: "hideout#create"
  delete '/hideouts', to: "hideout#destroy"
  put '/hideouts/rename', to: "hideout#rename"
  put "/hideouts/users", to: "hideout#add"
  delete "/hideouts/users", to: "hideout#leave"
  delete "/hideouts/destroy", to: "hideout#destroy"

  post '/expenses', to: "expenses#create"
  get 'expenses/destroy'

end




