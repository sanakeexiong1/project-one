$(document).ready(function () {

    $("#forminfo").on("submit", function (e) {
        e.preventDefault();
        $("#artistHeadline").empty();
        $("#newsDisplay").empty();
        $("#gifImage").empty();
        $("#spotDisplay").empty();
        $("#bioDisplay").empty();


        var artist = $("input[name='artist']").val();
        console.log(artist);
        $("#artistHeader").text(artist);

        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            artist +
            "&api_key=o2BMu32QNHXQZs2A5dgV6kntwDSDTrXU&limit=3";

        console.log(queryURL);

        $.get(queryURL, function (response2) {
            console.log(response2);

            var results2 = response2.data;

            for (var i = 0; i < results2.length; i++) {
                // Creating and storing a div tag
                var newgifDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results2[i].rating);
                // Creating and storing an image tag
                var gifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                gifImage.attr("src", results2[i].images.fixed_height.url);
                // Appending the paragraph and image tag to the animalDiv
                newgifDiv.append(p);
                newgifDiv.prepend(gifImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifImage").prepend(newgifDiv);
            };
        }).then(function () {

            $.ajax({
                url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json",
                success: function (response3) {
                    console.log(response3);

                    var results3 = response3.artist;
                    console.log(results3);

                    // Creating and storing a div tag
                    var newbioDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text(results3.bio.summary);
                    // Appending the paragraph and image tag to the animalDiv
                    newbioDiv.append(p);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#bioDisplay").append(newbioDiv);
                }
            });

        }).then(function () {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist + "&limit=3",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "286743b9e8mshca96ef72bc84158p10a340jsn84bc27c45ef1"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);

                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    // Creating and storing a div tag
                    var newtrackDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Title: " + results[i].title);
                    // Creating and storing an image tag
                    var trackLink = $("<img>");
                    var trackImg = $("<a> Play on Deezer! </a>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    trackLink.attr("src", results[i].album.cover);
                    trackImg.attr("href", results[i].link);
                    // Appending the paragraph and image tag to the animalDiv
                    newtrackDiv.append(trackImg);
                    newtrackDiv.append(p);
                    newtrackDiv.prepend(trackLink);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#spotDisplay").append(newtrackDiv);
                };
            });


        }).then(function () {

            var queryURL2 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + artist + "&api-key=N1PAfjpWLPTkYo3aG4S8CFaFm9UlS6mv"

            console.log(queryURL2);

            $.get(queryURL2, function (response4) {
                console.log(response4);

                var results4 = response4.response.docs;
                console.log(results4);

                for (var i = 0; i < results4.length; i++) {
                    // Creating and storing a div tag
                    var nytDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<h4>").text(results4[i].headline.main);
                    // Creating and storing an image tag
                    var nytImage = $("<p>").text("Article Abstract: " + results4[i].abstract);
                    var readMore = $("<a> Read More on NYT! </a>");
                    readMore.attr("href", results4[i].web_url);
                    // Appending the paragraph and image tag to the animalDiv
                    nytDiv.prepend(p);
                    nytDiv.append(nytImage);
                    nytDiv.append(readMore)
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#newsDisplay").append(nytDiv);
                };


            });

        }).then(function () {

            function authenticate() {
                return gapi.auth2.getAuthInstance()
                    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
                    .then(function () { console.log("Sign-in successful"); },
                        function (err) { console.error("Error signing in", err); });
            }
            function loadClient() {
                gapi.client.setApiKey("AIzaSyBA6-_OD-6JJj0-Gr4FjtF6KIeZeBQxXQ8");
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function () { console.log("GAPI client loaded for API"); },
                        function (err) { console.error("Error loading GAPI client for API", err); });
            }
            // Make sure the client is loaded and sign-in is complete before calling this method.
            function execute() {
                return gapi.client.youtube.search.list({
                    "part": "snippet",
                    "maxResults": 3,
                    "q": artist
                })
                    .then(function (response5) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response5.result);

                        youTubeSearch
                    },
                        function (err) { console.error("Execute error", err); });
            }
            gapi.load("client:auth2", function () {
                gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
            });

            execute();
            authenticate().then(loadClient);


            // var settings = {
            //     "async": true,
            //     "crossDomain": true,
            //     "url": "https://coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com/?id=lF-jPBnZ098",
            //     "method": "GET",
            //     "headers": {
            //         "x-rapidapi-host": "coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com",
            //         "x-rapidapi-key": "286743b9e8mshca96ef72bc84158p10a340jsn84bc27c45ef1",
            //     }
            // }

            // $.ajax(settings).done(function (response5) {
            //     console.log(response5);
            // });


        })

    });
});

