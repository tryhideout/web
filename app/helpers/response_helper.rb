module ResponseHelper
  def ResponseHelper.generate_error_response(message)
    error_response = { error: message }
    return error_response.to_json
  end

  def ResponseHelper.generate_resource_location_url(resource_name, object_id)
    return ENV['API_BASE_URL'] + "/#{resource_name}/#{object_id}"
  end
end
