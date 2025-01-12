# frozen_string_literal: true

# ProjectImage model representing images associated with a project
class ProjectImage < ApplicationRecord
  belongs_to :project
  has_one_attached :image

  validates :image, presence: true
  validates :name, presence: true
  validates :tag, presence: true
  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :image, size: { less_than: 5.megabytes, message: I18n.t('errors.messages.file_too_large') }
end
