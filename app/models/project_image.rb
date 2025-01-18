# frozen_string_literal: true

# ProjectImage model representing images associated with a project
class ProjectImage < ApplicationRecord
  belongs_to :project
  has_one_attached :image

  enum :tag, {
    cover: 'cover',
    blueprint: 'blueprint',
    details: 'details',
    other: 'other'
  }, default: 'other'

  validates :image, presence: true
  validates :name, presence: true,
                   uniqueness: { scope: :project_id, message: I18n.t('errors.messages.name_not_unique') },
                   length: { maximum: 20, message: I18n.t('errors.messages.name_too_long') }
  validates :tag, presence: true, inclusion: { in: tags.keys, message: I18n.t('errors.messages.invalid_tag') }
  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :image, size: { less_than: 5.megabytes, message: I18n.t('errors.messages.file_too_large') }
end
