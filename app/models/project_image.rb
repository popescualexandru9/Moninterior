# frozen_string_literal: true

# ProjectImage model representing images associated with a project
class ProjectImage < ApplicationRecord
  include TagType

  acts_as_list scope: :project

  belongs_to :project
  has_one_attached :image

  default_scope { order(position: :asc) }

  validates :name, presence: true,
                   uniqueness: { scope: :project_id, message: I18n.t('errors.messages.name_not_unique') },
                   length: { maximum: 20, message: I18n.t('errors.messages.name_too_long') }
  validates :tag, presence: true, inclusion: { in: TagType.all, message: I18n.t('errors.messages.invalid_tag') }
  validates :image, presence: true
  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :image, size: { less_than: 5.megabytes, message: I18n.t('errors.messages.file_too_large') }
end
