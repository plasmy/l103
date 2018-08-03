$(document).ready(function(){
    //Code for the search button
    $('[name=search]').click(function(){
        $('[name=downloadtxt]').show();
        $('[name=tableResult]').show();
        var month = $('[name=month]').val();
        var year = $('[name=year]').val();

        var urlSearch = '/l103/' + year;
        if(month)
            urlSearch += '/' + month;

        console.log(urlSearch);

        $.get(urlSearch, function(response){
            console.log(response)
            $('[name=tableResult] tbody tr').remove();

            //Create table columns with data and add to row
            $.each(response, function(key, value){
                var tr = $("<tr>");
                var td =
                '<td>' + value.NU_ENTIDAD + '</td>'+
                '<td>' + value.RG_TRANS + '</td>' +
                '<td>' + value.RG_COL + '</td>' +
                '<td>' + value.RG_ROW + '</td>' +
                '<td>' + value.RG_VALUE + '</td>' +
                '<td>' + value.CYYYYMM + '</td>' +
                '<td>' + value.TRANS_FILETYPE + '</td>'

                tr.append($(td));
                $('[name=tableResult] tbody').append(tr); //
            });
        });
    });
});