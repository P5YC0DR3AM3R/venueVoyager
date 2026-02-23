const newFormHandler = async (event) => {
  event.preventDefault();
  const id = document.querySelector("#stadium-id").value.trim();
  const date = document.querySelector("#date-visited").value.trim();
  const ratingElement = document.querySelector("input[name='rating']:checked");
  const review = document.querySelector("#stadium-review").value.trim();
  const rating = ratingElement ? ratingElement.value : null;

  if (!rating) {
    alert("Please select a rating.");
    return;
  }

  if (id && date && review) {
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
      alert("Failed to create rating.");
    }
  } else {
    alert("Please fill in all fields.");
  }
};
document
  .querySelector(".new-stadium-form")
  .addEventListener("submit", newFormHandler);
