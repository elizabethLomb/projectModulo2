window.onload = function() {
  $('#exampleModal').on('shown.bs.modal', function () {
    $('#inputSearch').trigger('focus')
  })
}
