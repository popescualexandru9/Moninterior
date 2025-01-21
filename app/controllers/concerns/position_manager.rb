# Class for managing positions
class PositionManager
  attr_reader :model_class, :ids

  def initialize(model_class, ids)
    @model_class = model_class
    @ids = sanitize_ids(ids)
  end

  def update_positions
    records = fetch_records

    ids.each_with_index do |id, index|
      update_record_position(records[id], id, index + 1)
    end
  end

  private

  # Sanitizes the IDs by removing blanks, ensuring uniqueness, and converting to integers
  def sanitize_ids(ids)
    ids.compact_blank.uniq.map(&:to_i)
  end

  # Fetches records in a single query and indexes them by ID
  def fetch_records
    model_class.where(id: ids).index_by(&:id)
  end

  # Updates the position of a record if it exists; otherwise, logs a warning
  def update_record_position(record, id, position)
    if record
      record.update!(position: position)
    else
      Rails.logger.warn "Record with ID #{id} not found. Skipping update."
    end
  end
end
