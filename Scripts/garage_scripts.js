let click_number;
let delete_text = "To Delete, Press Again. To Deselect, Refresh The Page";
let car;
function delete_car(target) {
  if (click_number === "2") {
    click_number = undefined;
  }
  if (click_number === "1") {
    if (delete_text == target.innerHTML) {
      target.innerHTML = car;
      const data = {
        car: target.innerHTML,
      };

      const url = "http://localhost:3000/car_module/delete";
      let request_param = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log("beep");
      fetch(url, request_param).then(function (res) {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }
  if (click_number === undefined) {
    car = target.innerHTML;
    click_number = "1";
    target.style.color = "red";
    target.textContent = delete_text;
  }
}

// get request be too speedy
