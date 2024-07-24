module ResponseHelper
  def self.generate_error_response(message)
    error_response = { error: message.end_with?('.') ? message : message + '.' }
    error_response.to_json
  end

  def self.generate_resource_location_url(resource_name, object_id)
    ENV['API_BASE_URL'] + "/#{resource_name}/#{object_id}"
  end
end
