Rails.application.routes.draw do
  root "auth#index"

  get '/', to: 'auth#index'
  get 'signup', to: 'auth#signup'
  get 'landing', to: 'auth#landing'
  get 'home', to: 'auth#home'
  get 'login', to: 'auth#login'


  post "/login", to: "auth#login"
  post "/signup", to: "auth#signup"
  post "/logout", to: "auth#logout"
end
