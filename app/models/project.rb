# frozen_string_literal: true

# Project model representing a construction or renovation project
class Project < ApplicationRecord
  has_many :project_images, dependent: :destroy
  has_many_attached :images

  # Validation for images
  validates :images, attached: true
  validates :images, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :images, size: { less_than: 5.megabytes, message: I18n.t('errors.messages.file_too_large') }
end
