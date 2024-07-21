class StatusesChannel < ApplicationCable::Channel
  def subscribed
    hideout_id = params[:hideout_id]
    stream_from "statuses:#{hideout_id}"

    current_statuses = User.get_all_statuses_by_hideout_id(hideout_id:)
    transmit(current_statuses.to_json)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
