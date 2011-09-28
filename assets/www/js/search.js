function search()
{
	if (hasNetworkConnection())
	{
		var searchParam = document.getElementById("searchParam").value;
		var requestUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&";
		requestUrl += "search=" + searchParam + "&";
		requestUrl += "format=json";

		var xmlhttp;

		if (window.XMLHttpRequest)
  		{// code for IE7+, Firefox, Chrome, Opera, Safari
  			xmlhttp=new XMLHttpRequest();
  		}
		else
  		{// code for IE6, IE5
  			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  		}
	
		xmlhttp.onreadystatechange=function()
  		{
  			if (xmlhttp.readyState==4 && xmlhttp.status==200)
    		{
    			displayResults(xmlhttp.responseText);
    		}
  		}

		//xmlhttp.setRequestHeader("User-Agent", "WikipediaMobile");
		xmlhttp.open("GET", requestUrl, true);
		xmlhttp.send();	
	}
	else
	{
		noConnectionMsg();
		hideOverlayDivs();
	}
}

function displayResults(results)
{
	var formattedResults = "";
	
	if (results != null)
	{
		results = eval(results);
	
		var searchParam = results[0];
		var searchResults = results[1];
		
		for (var i=0;i<searchResults.length;i++)
		{
			var article = searchResults[i];
			formattedResults += "<div class='listItemContainer'>";
			formattedResults += "<div class='listItem'>";
			formattedResults += "<span class='iconSearchResult'>icon</span>";
			formattedResults += "<a href=\"javascript:goToResult(\'" + article + "\');\">" + article + "</a>";
			formattedResults += "</div>";
			formattedResults += "</div>";
		}
	}
	else
	{
		formattedResults += "nothingness...";
	}
	
	formattedResults += "<br><br><div onclick='javascript:hideSearchResults();'>close</div>";
	
	document.getElementById("resultList").innerHTML=formattedResults;
	
	hideOverlayDivs();
	
	document.getElementById("searchresults").style.display = "block";
	document.getElementById("content").style.display = "none";
}

function goToResult(article)
{
	if (hasNetworkConnection())
	{
		var url = "http://en.wikipedia.org/wiki/" + article;	
		document.getElementById("main").src = url;
	}
	else
	{
		noConnectionMsg();
	}

	hideOverlayDivs();
	showContent();
}

function hideSearchResults()
{
	hideOverlayDivs();
	showContent();
}
