# frozen_string_literal: true

# Update existing project image tags to use the new enum values
class UpdateExistingProjectImageTags < ActiveRecord::Migration[7.1]
  def up
    ProjectImage.find_each do |image|
      next if %w[cover blueprint details other].include?(image.tag)

      # Intentionally skipping validations in migration for performance
      # rubocop:disable Rails/SkipsModelValidations
      image.update_column(:tag, 'other')
      # rubocop:enable Rails/SkipsModelValidations
    end
  end

  def down
    # No need for rollback as we're just standardizing existing data
  end
end
