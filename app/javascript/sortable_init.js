// Sortable projects
const initSortableProjects = () => {
  var csrfToken = $('meta[name="csrf-token"]').attr("content");

  $("#sortable_projects").sortable({
    update: function (event, ui) {
      var projectIds = $(this).sortable("toArray", { attribute: "data-id" });
      $.ajax({
        url: "/admin/projects/update_positions",
        method: "PATCH",
        data: { project_ids: projectIds },
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });
    },
  });
  $("#sortable_projects").disableSelection();

  $(".sortable_project_images").sortable({
    update: function (event, ui) {
      var projectId = $("#project_id").val();
      var imageIds = $(this).sortable("toArray", { attribute: "data-id" });
      $.ajax({
        url: `/admin/projects/${projectId}/project_images/update_positions`,
        method: "PATCH",
        data: { project_image_ids: imageIds },
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });
    },
  });
  $(".sortable_project_images").disableSelection();
};

export { initSortableProjects };
