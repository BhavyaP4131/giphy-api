console.log("script.js loaded");

// ============================================================
// Your Giphy API key (from developers.giphy.com)
// ============================================================
const apiKey = "j1AIBrVjUpo394q7KmdOXgZwWlXLMzve";

// ============================================================
// Array to store the fetched GIF image URLs
// ============================================================
let images = [];

// ============================================================
// Grab the elements we need from the DOM
// ============================================================
const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// ============================================================
// Fetches GIFs from the Giphy API based on the search input.
// Falls back to "funny" if the search box is left empty.
// ============================================================
async function fetchGifs() {
  const query = searchInput.value.trim() || "funny";
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=12`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    images = data.data.map(function (gif) {
      return gif.images.original.url;
    });

    console.log(images);

    gifContainer.innerHTML = "";

    for (let i = 0; i < images.length; i++) {
      gifContainer.innerHTML += `<img src="${images[i]}" class="col-3 mb-3">`;
    }
  } catch (error) {
    console.log("Error fetching GIFs:", error);
    gifContainer.innerHTML = "<p>Something went wrong fetching GIFs. Please try again.</p>";
  }
}

// ============================================================
// Attach a click event listener to the button that calls fetchGifs()
// ============================================================
fetchGifBtn.addEventListener("click", fetchGifs);
