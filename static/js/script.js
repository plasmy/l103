var pageCount;
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
            pageCount = Math.ceil(response.length / 10); //Amount of pages in pagination. Each page has 10 rows.
            paginate(0);
            $('[name=download]').show(); //Show download button
            $('[name=tableResult]').show(); //Show table with data

            //Create first page of table.
            loadPage(0);

            $('body').removeClass("loading");
        });
    });

    //Create Pagination of table
    function paginate(clickedPage){
        console.log('Perform');
        $('.pagination li').remove();

        var startingPage = (pageCount - 10) <= clickedPage ? parseInt(pageCount - 10) : parseInt(clickedPage);
        var endingPage = parseInt(startingPage + 10);

        console.log(startingPage);
        console.log(endingPage);

        //Add button to go to first page
        if(startingPage > 0){
            var firstPage = $('<li><a href="#">1</a></li>');
            firstPage.click(function(e){
                var startingIndex = 0
                paginate($(e.target).html())
                loadPage(startingIndex);
            });
            $('.pagination').append($(firstPage));
            $('.pagination').append($('<li><a href="#">.....</a></li>'));
        }

        for(var i = startingPage; i < endingPage; i++){
            console.log('For execution||' + i);
            var page = $("<li><a href='#'>" + (i + 1) + "</a></li>");
            page.click(function(e){
                var startingIndex = ($(e.target).html() - 1) * 10;
                paginate($(e.target).html())
                loadPage(startingIndex);
            });
            $('.pagination').append(page);
            if(i + 1 == pageCount) break;
        }

        //Add button to go to last page
        if(pageCount > 10 && (pageCount - 10) > endingPage){
            $('.pagination').append($('<li><a href="#">.....</a></li>'));
            var lastPage = $('<li><a href="#">' + pageCount + '</a></li>');
            lastPage.click(function(e){
                var startingIndex = ($(e.target).html() - 1) * 10;
                paginate($(e.target).html())
                loadPage(startingIndex);
            });
            $('.pagination').append($(lastPage));
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