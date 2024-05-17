const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("plz work");
  const id = document.querySelector("#stadium-id").value.trim();
  const date = document.querySelector("#date-visited").value.trim();
  const rating = document.querySelector("input[name='rating']:checked").value;
  const review = document.querySelector("#stadium-review").value.trim();

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
document
  .querySelector(".new-stadium-form")
  .addEventListener("submit", newFormHandler);
