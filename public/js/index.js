window.onload = function() {
  $('#exampleModal').on('shown.bs.modal', function () {
    $('#inputSearch').trigger('focus')
  })
}

function like(event) {
  const button = event.target;

  axios.post(`/quejas/${button.id}/like`)
    .then(response => {
      const likesContainer = button.querySelector(".likes-count")

      likesContainer.innerText = Number(likesContainer.innerText) + response.data.likes
    })
    .catch(console.error)
}