$(document).ready(function(){
    //Code for the search button
    $('[name=search]').click(function(){
        var month = $('[name=month]').val();
        var year = $('[name=year]').val();

        //Construct url where the data will be obtained
        var urlSearch = '/l103/' + year;
        if(month)
            urlSearch += '/' + month;

        $.get(urlSearch, function(response){
            $('[name=download]').show(); //Show download button
            $('[name=tableResult]').show(); //Show table with data
            $('[name=tableResult] tbody tr').remove(); //Remove existing data in the table

            //Create table columns with data and add to row, then to table
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
                $('[name=tableResult] tbody').append(tr);
            });
        });
    });
});