# frozen_string_literal: true

# Types of Image tags
module TagType
  COVER = 'cover'
  BLUEPRINT = 'blueprint'
  DETAILS = 'details'
  OTHER = 'other'

  def self.all
    [COVER, BLUEPRINT, DETAILS, OTHER]
  end
end
