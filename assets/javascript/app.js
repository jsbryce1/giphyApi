$(function () {
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    console.log("page loaded");
});

var searchArray = ["dog", "cat", "bird"];

function populateButtons(searchArray, classToAdd, areaToAdd) {
    $(areaToAdd).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAdd).append(a);
    }
}
$(document).on("click", ".searchButton", function () {
    $("#searches").empty();
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=65wF1q6MCn6fyAK0Bc0j3j9EaVUciJCM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var searchDiv = $("<div class='search-item'>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv)

        }

    })
});



$(document).on("click", ".searchImage", function () {
    var state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }


});
$("#addSearch").on("click", function () {
    var newSearch = $("input").eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    return false;
})

$("#addSearch")