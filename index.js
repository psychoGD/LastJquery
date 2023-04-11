$(document).ready(function(){
    $("#MainMenu").hide();
    // $("#email").("george.bluth@reqres.in")
    // $("#firstname").text("George")
    // $("#lastname").text("Bluth")
    $("#LogInButton").click(function(){
        let InputEmail = $("#email").val()
        let InputFirstname = $("#firstname").val()
        let InputLastname = $("#lastname").val()
        $.ajax({url:"https://reqres.in/api/users",success:function(result){
            let data = result.data;
            console.log(InputEmail)
            data.forEach(u => {
                console.log(u)
                if(u.email==InputEmail && u.first_name==InputFirstname && u.last_name ==InputLastname){
                    alert("Found")
                    return
                }
            });
            alert("Does Not Found")
        }})
    })
})