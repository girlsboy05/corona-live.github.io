// data fetch from rapid api using js converting into json
// coded by Saif Abrar

// fetch for world total stats
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "676a9dace2msh26245f119ccfa57p17c33djsn05eea3176681"
	}
})
.then(resp => resp.json())
.then(data => {
	document.getElementById('worldCases').innerHTML = data.total_cases;
	document.getElementById('worldDeaths').innerHTML = data.total_deaths;
	document.getElementById('worldNewDeaths').innerHTML = data.new_deaths;
	document.getElementById('worldNewsCases').innerHTML = data.new_cases;
	document.getElementById('worldRecovered').innerHTML = data.total_recovered;
})
.catch(err => {
	console.log(err);
});

// fetch for bangladesh stats
fetch("https://covid-193.p.rapidapi.com/statistics?country=Bangladesh", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "676a9dace2msh26245f119ccfa57p17c33djsn05eea3176681"
	}
})
.then(resp => resp.json())
.then(data => {
	let response = data.response;
	document.getElementById('bdCases').innerHTML = response[0].cases.total;
	document.getElementById('bdDeaths').innerHTML = response[0].deaths.total;
	document.getElementById('bdRecovered').innerHTML = response[0].cases.recovered;
	document.getElementById('bdNewCases').innerHTML = response[0].cases.new;
	document.getElementById('bdNewDeaths').innerHTML = response[0].deaths.new;
	document.getElementById('bdTests').innerHTML = response[0].tests.total;
	document.getElementById('bdTime').innerHTML = response[0].time;
})
.catch(err => {
	console.log(err);
});

// fetch for kuwait stats
fetch("https://covid-193.p.rapidapi.com/statistics?country=Kuwait", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "676a9dace2msh26245f119ccfa57p17c33djsn05eea3176681"
	}
})
.then(resp => resp.json())
.then(data => {
	let response = data.response;
	document.getElementById('kwCases').innerHTML = response[0].cases.total;
	document.getElementById('kwDeaths').innerHTML = response[0].deaths.total;
	document.getElementById('kwRecovered').innerHTML = response[0].cases.recovered;
	document.getElementById('kwNewCases').innerHTML = response[0].cases.new;
	document.getElementById('kwNewDeaths').innerHTML = response[0].deaths.new;
	document.getElementById('kwTests').innerHTML = response[0].tests.total;
	document.getElementById('kwTime').innerHTML = response[0].time;
})
.catch(err => {
	console.log(err);
});

// fetch for country wise data table
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "676a9dace2msh26245f119ccfa57p17c33djsn05eea3176681"
	}
})
.then(resp => resp.json())
.then(data => {
  let arr = data.countries_stat;
  for (var i = 1; i < 2; i++) {
    let countryName = arr[i].country_name;
    let cases = arr[i].cases;
    let newsCases = arr[i].new_cases;
    let deaths = arr[i].deaths;
    let newDeaths = arr[i].new_deaths;
    let recovered = arr[i].total_recovered;
    let tests = arr[i].total_tests;
    var x = "";
    x += "<tr>";
    x += "<td>"+countryName+"</td>";
    x += "<td>"+cases+" (+"+newsCases+")</td>";
    x += "<td>"+deaths+" (+"+newDeaths+")</td>";
    x += "<td>"+recovered+"</td>";
    x += "<td>"+tests+"</td>";
    x += "</tr>";
    document.getElementById('tableData').innerHTML = x;
  }
	for (var i = 2; i < arr.length; i++) {
    let countryName = arr[i].country_name;
    let cases = arr[i].cases;
    let newsCases = arr[i].new_cases;
    let deaths = arr[i].deaths;
    let newDeaths = arr[i].new_deaths;
    let recovered = arr[i].total_recovered;
    let tests = arr[i].total_tests;
    var x = "";
    x += "<tr>";
    x += "<td>"+countryName+"</td>";
    x += "<td>"+cases+"<br>(+"+newsCases+")</td>";
    x += "<td>"+deaths+"<br>(+"+newDeaths+")</td>";
    x += "<td>"+recovered+"</td>";
    x += "<td>"+tests+"</td>";
    x += "</tr>";
    document.getElementById('tableData').innerHTML += x;
  }
})
.catch(err => {
	console.log(err);
});
