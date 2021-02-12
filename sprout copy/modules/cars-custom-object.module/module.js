const listingDateSpans = document.getElementsByClassName("listing_date");

const currentDateTime = new Date();

const howLongSinceListing = (dateElement) => {
  const listingDate = dateElement.innerHTML;
  const unformatedTimeSinceListing = currentDateTime - new Date(listingDate);
  return msToTime(unformatedTimeSinceListing);
};

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ":hrs " + mins + ":mins " + secs + "secs";
}
console.log(listingDateSpans);

for (listingDateSpan of listingDateSpans) {
  listingDateSpan.innerHTML = howLongSinceListing(listingDateSpan);
}
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsokOpSt4_I9mbCkGUA2LsXdq0ugIBKtg&callback=initMap";
script.defer = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  console.log("maps is ready");
  const locationElems = document.getElementsByClassName("dealer_location");
  const callback = (response, status) => {
    response.rows.forEach((row, i) => {
      locationElems[i].innerHTML = row.elements[0].distance.text;
    });
  };

  const distanceService = new google.maps.DistanceMatrixService();

  var origins = [];
  var destinations = [];

  for (dealer of locationElems) {
    console.log(dealer.innerHTML);
    origins.push(dealer.innerHTML);
    destinations.push("42.3667, -71.106");
  }

  console.log(origins);
  console.log(destinations);
  distanceService.getDistanceMatrix(
    {
      origins,
      destinations,
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    },
    callback
  );

  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

const favoriteHeart = document.querySelector("#favorite");

console.log({ contactId, carId });

favoriteHeart.addEventListener("change", (e) => {
  if (e.target.checked == true) {
    fetch("/_hcms/api/add-favorite/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactId, carId }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  } else {
    fetch("/_hcms/api/remove-favorite/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactId, carId }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  console.log("changed!");
});
