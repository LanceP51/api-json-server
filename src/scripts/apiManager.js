fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
        // return(parsedFoods)
        displayFoods = document.querySelector(".foodList")
        parsedFoods.forEach(food => {
            //Print foods to DOM
            // displayFoods.innerHTML+=`<div class="foodBlock"><p class="foodItemName">${food.name}</p><p>${food.category}</p><p>${food.ethnicity}</p></div>`
            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    // Build HTML string for individual food
                    singleListing =`<div class="foodBlock"><p class="foodItemName">${food.name}</p><p> Categorized as ${food.category}, and historicalized as ${food.ethnicity}</p><p id="ingredients">${food.ingredients}</p></div>`
                    // Add HTML string to DOM
                    displayFoods.innerHTML+=singleListing
                })
         })
    })