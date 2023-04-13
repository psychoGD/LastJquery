$(document).ready(function () {
  $("#MainMenu").hide();
  $("#email").val("george.bluth@reqres.in");
  $("#firstname").val("George");
  $("#lastname").val("Bluth");

  const movieTemplate = `
  <div class="movie_card" id="tomb">
  <div class="info_section">
    <div class="movie_header">
      <img class="locandina" src="https://mr.comingsoon.it/imgdb/locandine/235x336/53750.jpg"/>
      <h1>Tomb Raider</h1>
      <h4>2018, Roar Uthaug</h4>
      <span class="minutes">125 min</span>
      <p class="type">Action, Fantasy</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.
      </p>
    </div>
  </div>
  <div class="blur_back tomb_back"></div>
</div>
  `

  function getMovieTemplate(Poster,Title,Year,Director,Runtime,Genre,Plot){
    return `
    <div class="movie_card">
    <div class="info_section">
      <div class="movie_header">
        <img class="locandina" src=${Poster}/>
        <h1>${Title}</h1>
        <h4>${Year}, ${Director}</h4>
        <span class="minutes">${Runtime} min</span>
        <p class="type">${Genre}</p>
      </div>
      <div class="movie_desc">
        <p class="text">
          ${Plot}
        </p>
      </div>
    </div>
    <div class="blur_back" style="background:url(${Poster})"></div>
  </div>
    `
  }
  var BreakException = {};
  $("#LogInButton").click(function () {
    let InputEmail = $("#email").val();
    let InputFirstname = $("#firstname").val();
    let InputLastname = $("#lastname").val();
    $.ajax({
      url: "https://reqres.in/api/users",
      success: function (result) {
        let data = result.data;
        data.forEach((u) => {
          if (u.email == InputEmail &&u.first_name == InputFirstname &&u.last_name == InputLastname) {
            $("#LogIn").hide()
            $("body").css("background-color","white")
            $("#MainMenu").show();
          }
        });
      },
    });
  });

  $("#SearchButton").click(function(){
    let movieSearch = $("#MovieSearch").val()
    if(movieSearch!=null || movieSearch != "" || movieSearch != " "){

      $.ajax({url:`http://www.omdbapi.com/?apikey=bc7a997c&s=${movieSearch}`,success:function(movies){
        console.log(movies)
        console.log(typeof(movies))
        movies.Search.forEach((movie) => {
          console.log(movie)
          console.log($("#movies").html())
          $("#movies").html("")
          $.ajax({url:`http://www.omdbapi.com/?apikey=bc7a997c&t=${movie.Title}`,success:function(result){
            console.log(result)
            $("#movies").append(getMovieTemplate(result.Poster,result.Title,result.Year,result.Director,result.Runtime,result.Genre,result.Plot))
          }});
        });
      }});
    }
  })


});



