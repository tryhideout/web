Rails.application.routes.draw do
  root "auth#signup"

  get '/', to: 'auth#signup'
  get 'signup', to: 'auth#signup'
  get 'landing', to: 'auth#landing'
  get 'home', to: 'auth#home'
  get 'login', to: 'auth#login'


  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  post "/delete/session", to: "auth#logout"
end
