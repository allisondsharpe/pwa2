
	//Inventors of the World Wide Web
	//Author: Allison Sharpe


(function($) {


// login elements


    $('#submit').on('click', function(e){
        e.preventDefault();
        var user = $('#username').val();
        var pass = $('#password').val();
        console.log("Hello password is working!!");
        $.ajax({
            url: 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            } ,
            success:function(response){
                console.log("test user");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('dashboard.html');
                }
            }
        });
    });



// logout elements



    $('#signoutbtn').click(function(e) {
        e.preventDefault();
        $.get('xhr/logout.php', function() {
            window.location.assign('signout.html')
        })

    });


// register elements


    $('#register').click(function(e){
        e.preventDefault();
        var firstname= $('#firstname').val(),
            lastname= $('#lastname').val(),
            email= $('#email').val(),
            username= $('#username').val(),
            password= $('#password').val(),
            confirm= $('#confirm').val();
            console.log(firstname+''+lastname+''+email+''+username+''+password+''+confirm);

        $.ajax({
            url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password,
                confirm: confirm
            },
            success: function(response){
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('dashboard.html')
                }
            }

        });

    });


// dynamic button for id "project" - dashboard page


    $('#project').on('click', function(e){
        e.preventDefault();
        window.location.assign('project.html');
    });


// dynamic button for id "dashboardbtn" - projects page


    $('#dashboardbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('dashboard.html');
    });


// dynamic button for id "sign in" - sign out page/landing page


    $('#signIn').on('click', function(e){
        e.preventDefault();
        window.location.assign('index.html');
    });


// dynamic button for id "sign up" - sign out page/landing page


    $('#signUp').on('click', function(e){
        e.preventDefault();
        window.location.assign('registration.html');
    });


// display username


$.getJSON("xhr/check_login.php", function(data) {
    console.log(data);
    $.each(data, function(key, val){
        console.log(val.first_name);
        $(".userid").html("Welcome User: " + val.first_name);
    });
});


// new projects


$('#addButton').on('click', function(e) {
    e.preventDefault();
    var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projStatus = $('input[name = "status"]:checked').prop("id");

    $.ajax ({
        url: "xhr/new_project.php",
        type: "post",
        dataType: "json",
        data: {
            projectName: projName,
            projectDescription: projDesc,
            status: projStatus
        },
        success: function(response){
            console.log('testing');

            if(response.error) {
                alert(response.error);
            }else{
                window.location.assign("project.html");
            }
        }

    });
});


// get projects


var projects = function() {
    $.ajax({
        url: 'xhr/get_projects.php',
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                console.log(response.error);
            } else {
                for (var i = 0, j = response.projects.length; i < j; i++) {
                    var result = response.projects[i];

                    $(".projects").append(
                        "<input class='projectid' type='hidden' value='' " + result.id + "'>" +
                        "Project Name: " + result.projectName + "<br>" + "Project Description: " +
                        result.projectDescription + "<br>" + "Project Status: " + result.status + "<br>"
                        + '<button class="deletebtn">Delete</button>'
                        + '<button class="editbtn">Edit</button>'
                        + '</div> <br>'
                );
                }
                $('.deletebtn').on('click', function(e) {
                e.preventDefault();
                    console.log('test delete');
                    $.ajax({
                        url: 'xhr/delete_project.php',
                        data: {
                            projectID: result.id   //I got a bit confused at this part. I tried many options, but couldn't figure it out.
                        },                         // This is what I had: result.id + result.projectName + result.projectDescription + result.status
                        type: 'POST',
                        dataType: 'json',
                        success: function (response) {
                            console.log('Testing for success');

                            if (response.error) {
                                alert(response.error);
                            } else {
                                window.location.assign("project.html");
                            }
                        }
                    });
                });
            }
        }
    })
};
projects();


// tooltip elements


    $(".masterTooltip").hover(function () {
        // hover over
        var title = $(this).attr("title");
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
    }, function () {
        // hover out
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 20; // x coordinates
        var mousey = e.pageY + 10; // y coordinates
        $('.tooltip')
    });


// accordion elements


    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tabs-nav li').click(function (e) {
        e.preventDefault();
        $('#tabs p').hide();

        $('#tabs-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');


// modal elements


    $(".modalClick").on("click", function (event) {
        event.preventDefault();
        $("#overlay")
            .fadeIn()
            .find("#modal")
            .fadeIn();
    });

    $(".close").on("click", function (event) {
        event.preventDefault();
        $("#overlay")
            .fadeOut()
            .find("#modal")
            .fadeOut();
    });

    $(".mystatus").mouseover(function () {
        $(this).fadeTo(100, .3);
    });
    $(".mystatus").mouseout(function () {
        $(this).fadeTo(100, 1);
    });


// dialog elements


    $("#dialog").mouseover(function () {
        $(this).fadeTo(100, .2);
    });
    $("#dialog").mouseout(function () {
        $(this).fadeTo(100, 1);
    });


})(jQuery);

