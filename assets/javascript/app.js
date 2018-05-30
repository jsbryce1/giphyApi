$(document).ready(function(){
      // Initial array of images
      var images = ["cats","dogs","pizza","hugs",];

      // displayImages function re-renders the HTML to display the appropriate content
      function displayImages() {

        var image = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + image + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          $("#dump-gifs").empty();

          var results = response.data;

          // Retrieves the Rating Data
          console.log(response);

          // Loops the image for limit 10
          for(var i = 0; i < results.length; i++) {

            // Creates a div to hold the image
            var imageDiv = $("<div>");

            // Make the class for style.css
            imageDiv.addClass("randomPictures");

            // Creates an element to have the rating displayed
            var rating = results[i].rating;
            var p = $("<h2>").text("Rating: " + rating);

            // The Images can still or animate to call the class "randomImage" for click.
            var randomImage = $("<img>");
            randomImage.attr("src", results[i].images.fixed_height_still.url);
            randomImage.attr("data-still", results[i].images.fixed_height_still.url);
            randomImage.attr("data-animate", results[i].images.fixed_height.url);
            randomImage.attr("data-state", "still");
            randomImage.addClass('randoImage');

            // Displays the rating
            imageDiv.prepend(p);

            // Displays the image
            imageDiv.prepend(randomImage);
            $("#dump-gifs").prepend(imageDiv);
          }

          //if the variable state is equal to 'still',
          // then update the src attribute of this image to it's data-animate value,
          // and update the data-state attribute to 'animate'.
          // If state does not equal 'still', then update the src attribute of this
          // image to it's data-animate value and update the data-state attribute to 'still'
          $(".randoImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

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

      // Function for displaying image data
      function renderButtons() {

        // Deletes the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#new-button").empty();

        for(var i = 0; i < images.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var imageAdd = $("<button>");

          // Adds a class of image to our button
          imageAdd.addClass("image");

          // Added a data-attribute
          imageAdd.attr("data-name", images[i]);

          // Provided the initial button text
          imageAdd.text(images[i]);

          // Added the button to the image-buttons div
          $("#new-button").append(imageAdd);
        }
      }

      // This function handles events where the add image button is clicked
      $("#add-gif").on("click", function(event){
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var image = $("#gif-input").val().trim();

        // The image from the textbox is then added to our array
        images.push(image);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "image"
      $(document).on("click", ".image", displayImages);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});