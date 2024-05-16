const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#stadium-name").value.trim();
  const rating = document.querySelector(".rate").value.trim();
  const review = document.querySelector("#stadium-review").value.trim();

  if (name && rating && review) {
    const response = await fetch(`/api/stadiums`, {
      method: "POST",
      body: JSON.stringify({ name, rating, review }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create stadium");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/stadiums/${id}`, {
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
  .querySelector(".new-stadium-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".stadium-list")
  .addEventListener("click", delButtonHandler);
