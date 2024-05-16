const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("plz work");
  const id = document.querySelector("#stadium-id").value.trim();
  const date = document.querySelector("#date-visited").value.trim();
  const rating = document.querySelector("input[name='rating']:checked").value;
  const review = document.querySelector("#stadium-review").value.trim();
  console.log(`
  name:${id}
  date:${date}
  rating:${rating}
  review:${review}`);

  if (id && date && rating && review) {
    const response = await fetch(`/api/userStadium`, {
      method: "POST",
      body: JSON.stringify({ id, date, rating, review }),
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
