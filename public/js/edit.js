// document.addEventListener("DOMContentLoaded", () => {
//   document
//     .querySelector(".userstadium-content")
//     .addEventListener("click", (event) => {
//       if (event.target.classList.contains("edit-btn")) {
//         const stadiumId = event.target.getAttribute("data-id");
//         window.location.href = `/edit/${stadiumId}`;
//       }
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
  const editFormHandler = async (event) => {
    event.preventDefault();
    console.log("Edit form submission initiated");

    const id = document.querySelector("#stadium-id").value.trim();
    const date = document.querySelector("#date-visited").value.trim();
    const ratingElement = document.querySelector(
      "input[name='rating']:checked"
    );
    const review = document.querySelector("#stadium-review").value.trim();

    const rating = ratingElement ? ratingElement.value : null;

    if (id && date && rating && review) {
      const response = await fetch(`/api/userStadium/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({ date_visited: date, rating, review }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to update stadium");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  document
    .querySelector(".edit-stadium-form")
    .addEventListener("submit", editFormHandler);
});
