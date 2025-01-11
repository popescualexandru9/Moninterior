class Project < ApplicationRecord
  has_many :project_images, dependent: :destroy
  has_many_attached :images

  # Validation for images
  validates :images, attached: true
  validates :images, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  validates :images, size: { less_than: 5.megabytes, message: 'is too large (must be less than 5MB)' }
end
