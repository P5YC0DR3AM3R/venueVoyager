document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".userstadium-content")
    .addEventListener("click", async (event) => {
      if (event.target.classList.contains("edit-btn")) {
        const stadiumId = event.target.getAttribute("data-id");
        console.log("Stadium ID:", stadiumId);
        window.location.href = `api/userStadium/edit/${stadiumId}`;
      } else if (event.target.classList.contains("delete-btn")) {
        const id = event.target.getAttribute("data-id");
        const response = await fetch(`/api/userStadium/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          document.location.replace("/profile");
        } else {
          alert("Failed to delete stadium");
        }
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const delButtonHandler = async (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const id = event.target.getAttribute("data-id");

      const response = await fetch(`/api/userStadium/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to delete stadium");
      }
    }
  };

  document
    .querySelector(".userstadium-content")
    .addEventListener("click", delButtonHandler);
});
