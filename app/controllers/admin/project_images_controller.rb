# frozen_string_literal: true

module Admin
  # Controller for managing project images
  class ProjectImagesController < ApplicationController
    before_action :require_login
    before_action :check_session_timeout
    before_action :set_project
    before_action :set_project_image, only: [:destroy]

    def create
      return redirect_to admin_project_path(@project), alert: t('.already_uploaded') if recent_duplicate_image?

      @project_image = @project.project_images.build(project_image_params)

      if @project_image.save
        redirect_to admin_project_path(@project), notice: t('.success')
      else
        @project_images = @project.project_images
        render 'admin/projects/show', status: :unprocessable_entity
      end
    end

    def destroy
      @project_image.destroy
      redirect_to admin_project_path(@project), notice: t('.success')
    end

    def update_positions
      PositionManager.new(ProjectImage, params[:project_image_ids]).update_positions
      head :ok, notice: t('.updated_positions')
    end

    private

    # Check if an identical image was uploaded in the last minute
    def recent_duplicate_image?
      return True if @project.project_images
                             .where(name: project_image_params[:name])
                             .exists?(['created_at > ?', 1.minute.ago])

      False
    end

    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_project_image
      @project_image = ProjectImage.find(params[:id])
    end

    def project_image_params
      params.require(:project_image).permit(:name, :tag, :image)
    end
  end
end
