$(document).ready(function(){
    //Code for the search button
    $('[name=search]').click(function(){
        var month = $('[name=month]').val();
        var year = $('[name=year]').val();

        var url = '/l103/' + year;
        if(month)
            urlSearch += '/' + month

        $.ajax({
            url: urlSearch,
            success: function(response){
                console.log(response)
            }
            error: function(response){

            }
        });
    });
    return false;
});