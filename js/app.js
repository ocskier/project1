$(document).ready(function() {


    //Categories data  identifier: 
    //Animals = 1 
    //Arts, Culture, Humanities = 2 
    //Education = 3 
    //Environment = 4
    //Health = 5 
    //Human Services = 6
    //Human and Civil Rights = 8
    //Religion = 9
    //Research and Public Policy = 11

    var categoryImages = [{category:"Animals",url:"Animals1.jpg"},{category:"ArtsCultureHumanities",url:"ArtsCultureHumanities2.jpg"},
                            {category:"Education",url:"Education3.jpg"},{category:"Environment",url:"Environment4.jpg"},
                            {category:"Health",url:"Health5.jpg"},{category:"HumanServices",url:"HumanServices6.jpg"},
                            {category:"HumanCivilRights",url:"HumanCivilRights8.jpg"},{category:"Religion",url:"Religion9.jpg"},
                            {category:"ResearchPublicPolicy",url:"ResearchPublicPolicy11.jpg"}];
    
    console.log(categoryImages);
    for (var i=0;i<categoryImages.length;i++) {
        var catDiv = $('<div class="col s4 m3" category>');
        var cardA = $('<a href="results.html" target=""></a>');
        var cardDiv = $('<div class="card small"  style="height: 120px;"></div>');
        var cardImg = $('<div class="card-image" style="max-height: 100%; overflow: none;"></div>');              
        cardImg.append('<img class="responsive-img" src="images/'+categoryImages[i].url+'">');
        cardImg.append('<span class="card-title">'+categoryImages[i].category+'</span>');
        cardDiv.append(cardImg);
        cardA.append(cardDiv);
        catDiv.append(cardA);
        $("#catRow").append(catDiv);
    }
    
    //    var city = "raleigh";

    //    var state = "NC";

    //    var zip = "27613";
    
       var categoryIdentifier = $(".category").data("category-id");
    
       var queryURL = "https://api.data.charitynavigator.org/v2/Organizations?&app_id=d555fab3&app_key=21adfc6c878ba1839bb8e6a8e0838951&pageSize=9&rated=true&categoryID=11" 

    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(getData);
    
        function getData(data) {
            console.log(data);
            console.log(data[0].charityName);
            console.log(data[0].mission);
            console.log("Rating: " + data[0].currentRating.rating);
            console.log(data[0].websiteURL);
            console.log(data[0].irsClassification.subsection);


            //Loop Through Data Returned 

            for (var i = 0; i <data.length; i++) {
                //most-outer Div
                var $npDiv = $('<div id="'+data[i].charityName.replace(/\s+/g, '')+'" class="col s6 m4 cardcol for-buttons address"></div>');

                //Card Div
                var $mycard = $('<div class="card" style="height:275px"></div>');

                var $cardContent = $('<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="images/'+categoryImages[i].url +'" style="height:130px";></div>');

                var $cardContentAction = $('<div class="card-action" style="height:40%;padding: 5px 18px;">');
                
                var $cardContentSpan=$('<p class="card-title activator grey-text text-darken-4" style="font-size:20px;line-height:1.4rem;" ></span>');
                $cardContentSpan.text(data[i].charityName);

                var $icon = $("<i>");
                $icon.addClass("material-icons right");
                $icon.text("more_vert");

                $cardContentSpan.append($icon);
                $cardContentAction.append($cardContentSpan);

                //Card Reveal Creation
                var $cardReveal = $("<div>");
                $cardReveal.addClass("card-reveal");

                var $cardRevealSpan = $("<p>");
                $cardRevealSpan.addClass("card-title grey-text text-darken-4");
                $cardRevealSpan.css({"font-size":"16px","line-height":"1.4rem" });
                $cardRevealSpan.append(data[i].charityName);

                var $cardRevealIcon = $("<i>");
                $cardRevealIcon.addClass("material-icons right");
                $cardRevealIcon.css({"margin-left":"0","line-height":"1.25" });
                $cardRevealIcon.text("close");

                $cardRevealSpan.append($cardRevealIcon);

                var $cardRevealP = $("<p>");
                $cardRevealP.text("data[i].mission");
                var $cardRevealP2 = $("<p>");
                var $cardRevealLink1 = $('<a href="'+data[i].websiteURL+'" target="_blank" style="color:fuchsia">');
                $cardRevealLink1.text("Contribute");
                $cardRevealP2.append($cardRevealLink1);
                var $cardRevealP3 = $("<p>");
                var $cardRevealBtn = $('<button class="favChar" data-Name="'+data[i].charityName.replace(/\s+/g, '')+'"></button>');
                $cardRevealBtn.text("My Fav");
                $cardRevealP3.append($cardRevealBtn);

                $cardReveal.append($cardRevealSpan).append($cardRevealP).append($cardRevealP2).append($cardRevealP3);

                // Appending CardImg, CardContent, and Card Reveal to its div
                $mycard.append($cardContent);
                $mycard.append($cardContentAction);
                $mycard.append($cardReveal);
                $npDiv.append($mycard);

                //Appending to id=display-nonprofit
                $("#resultsRow").append($npDiv);
            }

        }

        //click event handler to retrieve data-address value
        $(document.body).on("click", ".address",googleGoogle);
        
        function googleGoogle() {
            var address = $(this).data("address");
            var queryURL1 = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=AIzaSyADEsM8kqCZ5T34NXVlTo7WI4k6X2EzHRI";

            //GeoCoding API 
            $.ajax({
            url: queryURL1,
            method:"GET"
            }).then(geoCode);
        
            function geoCode(response) {
                var result = response.results;
                var latitude = result[0].geometry.location.lat;
                var longitude = result[0].geometry.location.lng;
                console.log(result);
                console.log(result[0].place_id);
                console.log(latitude);
                console.log(longitude);

                $("map-dynamic").attr("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyADEsM8kqCZ5T34NXVlTo7WI4k6X2EzHRI&origin=place_id:" + result[0].place_id + "&zoom=10");

                // queryURL2 = "https://www.google.com/maps/search/?api=1&query=" + latitude + "%2C" + longitude;

                // $.ajax({
                //     url: queryURL2,
                //     method: "GET"
                // }).then(mapVisual)

                // function mapVisual(dataResult) {
                //     console.log(dataResult);

                    

                // }

            }

        }


            // Click handler for adding a gif to favorites
            $(".char-card").on("click", ".favChar", function () {

                // Grab the index info
                var nameClicked = $(this).attr("data-Name");
                console.log(nameClicked);
                // Remove the gif from search
                var copyCard = $("#"+nameClicked);
                console.log(copyCard);
                // Copy it to favorites container
                $("#"+nameClicked).remove();
            });
    });