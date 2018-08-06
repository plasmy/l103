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
            paginate(1);
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

        var pagesShown = 10; //Amount of pages to show in navigation
        var startingPage = parseInt(clickedPage);
        var endingPage = parseInt(clickedPage) + 10;

        if(pageCount <= pagesShown){
            startingPage = 1;
            endingPage = pageCount;
        }
        else{
            if(startingPage > 2)
                startingPage = startingPage - 1;
            endingPage = startingPage + 10;
        }

        //Add button to go to first page
        if(startingPage > 1){
            var firstPage = $('<li><a href="#">1</a></li>');
            firstPage.click(function(e){
                pageClick($(e.target).html());
            });
            $('.pagination').append($(firstPage));
            $('.pagination').append($('<li><a href="#">.....</a></li>'));
        }

        for(var i = startingPage; i < endingPage; i++){
            var page = $("<li><a href='#'>" + i + "</a></li>");
            page.click(function(e){
                pageClick($(e.target).html());
            });
            $('.pagination').append(page);
            if(i + 1 == pageCount) break;
        }

        //Add button to go to last page
        if(pageCount > 10 && endingPage != pageCount){
            $('.pagination').append($('<li><a href="#">.....</a></li>'));
            var lastPage = $('<li><a href="#">' + pageCount + '</a></li>');
            lastPage.click(function(e){
                pageClick($(e.target).html());
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

    //Execute when a page is clicked
    function pageClick(selectedPage){
        var startingIndex = (parseInt(selectedPage) - 1) * 10;
        paginate(parseInt(selectedPage))
        loadPage(startingIndex);
    }
});