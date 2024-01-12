module MiddlewareHelper
  def self.retrieve_request_details(request)
    request_identifier = [request.method, request.path]
    path_id = request.path.scan(/\d+/).first.to_i
    payload = request.params[:payload]
    [request_identifier, path_id, payload]
  end
end
