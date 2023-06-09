module HideoutHelper
  def HideoutHelper.generate_join_code(id)
    id_length = id.to_s(16).length
    return id.to_s if id_length >= 8

    time_now = Time.now.nsec.to_s(16)
    time_prefix = time_now[..(8 - id_length - 1)]
    return time_prefix + id.to_s(16)
  end
end
