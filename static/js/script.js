var pageCount = 2;
var dataResponse;

$(document).ready(function(){
    //Code for the search button
    $('[name=search]').click(function(){
        $('body').addClass("loading");
        var month = $('[name=month]').val();
        var year = $('[name=year]').val();

        //Construct url where the data will be obtained
        var urlSearch = '/l103/' + year;
        if(month)
            urlSearch += '/' + month;

        $.get(urlSearch, function(response){
            dataResponse = response;
            pageCount = response.length / 10; //Amount of pages in pagination. Each page has 10 rows.
            paginate();
            $('[name=download]').show(); //Show download button
            $('[name=tableResult]').show(); //Show table with data

            //Create first page of table.
            loadPage(0);

            $('body').removeClass("loading");
        });
    });

    //Create Pagination of table
    function paginate(){
        console.log('Hey')
        for(var i = 0; i < pageCount; i++){
            var page = $("<li><a href='#' value='" + (i * 10) + "'>" + (i + 1) + "</a></li>");
            page.click(function(e){
                var startingIndex = ($(e.target).html() - 1) * 10;
                loadPage(startingIndex);
            });
            $('.pagination').append(page);
        }
    }

    //Load clicked page's data
    function loadPage(page){
        $('[name=tableResult] tbody tr').remove(); //Remove existing data in the table
        //Create table columns with data and add to row, then to table
        for(var i = page; i < page + 10; i++){
            var tr = $("<tr>");
            var td =
            '<td>' + dataResponse[i].NU_ENTIDAD + '</td>'+
            '<td>' + dataResponse[i].RG_TRANS + '</td>' +
            '<td>' + dataResponse[i].RG_COL + '</td>' +
            '<td>' + dataResponse[i].RG_ROW + '</td>' +
            '<td>' + dataResponse[i].RG_VALUE + '</td>' +
            '<td>' + dataResponse[i].CYYYYMM + '</td>' +
            '<td>' + dataResponse[i].TRANS_FILETYPE + '</td>'

            tr.append($(td));
            $('[name=tableResult] tbody').append(tr);
            if(i + 1 == dataResponse.length) break; //Exit if there is no more data
        }
    }
});