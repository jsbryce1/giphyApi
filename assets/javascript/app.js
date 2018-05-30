$(document).ready(function () {

    var images = ["cats", "dogs", "pizza", "hugs", ];

    function displayImages() {
        var image = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + image + "&api_key=dc6zaTOxFJmzC&limit=10";

        // sends out an ajax request
        $.ajax({
            url: queryURL,
            method: "GET"
            // "Promise" after the data gets back from the API request
        }).done(function (response) {
            $("#dump-gifs").empty();
            var results = response.data;

            // runs through the results and limits it to 10
            for (var i = 0; i < results.length; i++) {
                var imageDiv = $("<div>");
                
                //stores the ratings in the imageDiv varianle after being run through the for loop
                var rating = results[i].rating;
                // Make a h2 element with jQuery and add the rating text inside and store it in the variable of p
                var p = $("<h2>").text("Rating: " + rating);
                
                var randomImage = $("<img>");
                randomImage.attr("src", results[i].images.fixed_height_still.url);
                randomImage.attr("data-still", results[i].images.fixed_height_still.url);
                randomImage.attr("data-animate", results[i].images.fixed_height.url);
                randomImage.attr("data-state", "still");
                randomImage.addClass('randoImage');

                // Append the p variable to the imageDiv variable.
                imageDiv.prepend(p);

                // Append the randomImage variable to the imageDiv variable.
                imageDiv.prepend(randomImage);
                // Prepend the imageDiv variable to the element with an id of dump-gifs.
                $("#dump-gifs").prepend(imageDiv);
            }

            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            $(".randoImage").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }
 
    function renderButtons() {
       // empties the new-button div before adding new ones
        $("#new-button").empty();
        //loops through the array of gifs
        for (var i = 0; i < images.length; i++) {
            // creates button for each movie in the array
            var imageAdd = $("<button>");
            // Adds a class of image to our button
            imageAdd.addClass("image");
            // Added a data-attribute with the value of images at index [i]
            imageAdd.attr("data-name", images[i]);
            // Provided the initial button text
            imageAdd.text(images[i]);
            // adds the button to the html
            $("#new-button").append(imageAdd);
        }
    }

    // when the submit input button is clicked, run this function
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // grabs the user input from the text box
        var image = $("#gif-input").val().trim();
        // pushes the new gif to the images array
        images.push(image);
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "image"
    $(document).on("click", ".image", displayImages);
    // displays the initial list of gifs
    
    renderButtons();
});

//## ######  refreshes the entire page to start over. ##### ##
$('#reload').click(function () {
    location.reload();
});