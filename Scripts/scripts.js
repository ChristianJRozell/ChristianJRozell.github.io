function menuopen() {
  let menu_contents; //declares a variable
  menu_contents = Array.from(document.getElementsByClassName('hide')); //returns a nodelist that is changed to an array, array contains the sidebar menu items
  menu_contents[0].style.display = 'block'; //allows for the items in the array to be styled when function is activated
  menu_contents[1].style.display = 'block';
  menu_contents[2].style.display = 'block';
  menu_contents;
  // varible
}
function menuclose() {
  let menu_contents; //declares a variable
  menu_contents = Array.from(document.getElementsByClassName('hide')); //returns a nodelist that is changed to an array, array contains the sidebar menu items
  menu_contents[0].style.display = 'none'; //allows for the items in the array to be styled when function is activated
  menu_contents[1].style.display = 'none';
  menu_contents[2].style.display = 'none';
}

//connect to api, get json
let data = (async () => {
  const where = encodeURIComponent(
    JSON.stringify({
      Make: {
        $exists: true,
      },
      Model: {
        $exists: true,
      },
      Year: {
        $exists: true,
      },
    })
  );
  const response = await fetch(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10000&order=Model&excludeKeys=Category&where=${where}`,
    {
      headers: {
        'X-Parse-Application-Id': 'ijyFjZ6qxEtHXo2V07pUI8uMfkelsmpxtWhbcQud', // This is your app's application id
        'X-Parse-REST-API-Key': 'Ct7pA9aVNs2d7zVziMaCtcPhC3jdLndn9kXbgMml', // This is your app's REST API key
      },
    }
  );
  const data = await response.json();
  return data;
  //console.log(data); // Here you have the data that you need
  //console.log(JSON.stringify(data, null, 2));
})();

data.then((data) => {
  //targeting "cars_dropdown"
  let dropdown = document.getElementById('cars_dropdown');
  dropdown.length = 0;
  //declares the default option
  let MakeOption = document.createElement('option');
  MakeOption.text = 'Choose Make/Manufactuer';
  //adds the default option
  dropdown.add(MakeOption);
  dropdown.selectedIndex = 0;

  let model_dropdown = document.getElementById('model_dropdown');
  model_dropdown.length = 0;

  let ModelOption = document.createElement('option');
  ModelOption.text = 'Choose Model';

  model_dropdown.add(ModelOption);
  model_dropdown.selectedIndex = 0;

  let year_dropdown = document.getElementById('year_dropdown');

  let YearOption = document.createElement('option');
  YearOption.text = 'Choose Year';

  year_dropdown.add(YearOption);
  year_dropdown.selectedIndex = 0;

  let make_option;
  let push_make_name;
  let make_name = [];
  let current_make;
  let skip;
  console.log(data);
  //create a dropdown option for each object in the array
  for (let i = 0; i < data.results.length; i++) {
    current_make = data.results[i].Make;
    //if make_name includes a value from current make return true
    skip = make_name.includes(current_make);
    //if skip is true continue
    if (skip) {
      continue;
    }
    //If statement to jump over anything with the Make of "BMW"
    //It has to run before BMW is iterated
    make_option = document.createElement('option');
    make_option.text = data.results[i].Make;
    dropdown.add(make_option);
    //adds current make to the mak_name array
    push_make_name = make_name.push(current_make);
  }
});
function populate_model() {
  let dropdown_clear = document.getElementById('model_dropdown');
  dropdown_clear = model_dropdown.length = 0;
  dropdown_clear = year_dropdown.length = 0;

  let ModelOption = document.createElement('option');
  ModelOption.text = 'Choose Model';
  model_dropdown.add(ModelOption);

  let YearOption = document.createElement('option');
  YearOption.text = 'Choose Year';
  year_dropdown.add(YearOption);

  let data = (async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        Make: {
          $exists: true,
        },
        Model: {
          $exists: true,
        },
        Year: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10000&order=Model&excludeKeys=Category&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'ijyFjZ6qxEtHXo2V07pUI8uMfkelsmpxtWhbcQud', // This is your app's application id
          'X-Parse-REST-API-Key': 'Ct7pA9aVNs2d7zVziMaCtcPhC3jdLndn9kXbgMml', // This is your app's REST API key
        },
      }
    );
    const data = await response.json();
    return data;
  })();
  data.then((data) => {
    let dropdown = document.getElementById('cars_dropdown');

    let selected_make = dropdown.options[dropdown.selectedIndex].value;

    let current_make;
    let model_option;
    let current_model;
    let model_name = [];
    let model_skip;
    let push_model_name;

    //remove past selected models
    for (let i = 0; i < data.results.length; i++) {
      current_make = data.results[i].Make;
      current_model = data.results[i].Model;
      model_skip = model_name.includes(current_model);

      if (!(selected_make === current_make) || model_skip) {
        continue;
      }

      model_option = document.createElement('option');
      model_option.text = data.results[i].Model;
      model_dropdown.add(model_option);
      push_model_name = model_name.push(current_model);
    }
  });
}
function populate_year() {
  let data = (async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        Make: {
          $exists: true,
        },
        Model: {
          $exists: true,
        },
        Year: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=10000&order=Model&excludeKeys=Category&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'ijyFjZ6qxEtHXo2V07pUI8uMfkelsmpxtWhbcQud', // This is your app's application id
          'X-Parse-REST-API-Key': 'Ct7pA9aVNs2d7zVziMaCtcPhC3jdLndn9kXbgMml', // This is your app's REST API key
        },
      }
    );
    const data = await response.json();
    return data;
  })();
  data.then((data) => {
    let year_dropdown = document.getElementById('year_dropdown');
    let model_dropdown = document.getElementById('model_dropdown');
    let dropdown = document.getElementById('cars_dropdown');

    let selected_model =
      model_dropdown.options[model_dropdown.selectedIndex].value;
    console.log(selected_model);

    let year_option;
    let current_model;

    for (let i = 0; i < data.results.length; i++) {
      current_model = data.results[i].Model;
      if (!(selected_model === current_model)) {
        continue;
      }

      year_option = document.createElement('option');
      year_option.text = data.results[i].Year;
      year_dropdown.add(year_option);
    }
  });
}
