//Change random background color each time page is loaded
var x = Math.floor(Math.random() * 100);
var y = Math.floor(Math.random() * 100);
var z = Math.floor(Math.random() * 100);
var random_color = "rgb(" + x + "," + y + "," + z + ")";
document.body.style.background = random_color;
$.ajax({
    url: "https://randomuser.me/api/?results=12",
    dataType: 'json'
}).done(function (data) {
//Add card class to each random employee
    $.each(data.results, function (i) {
        $employee = $(`<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${data.results[i].picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                        <p class="card-text">${data.results[i].email}</p>
                        <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
                    </div>
                </div>`);
        $("#gallery").append($employee);
    });

    $(".card").on("click", function (e) {
        card = data.results[$(this).index()];
        selectedIndex= $(this).index();
        select(card);              
    });
//Function to set modal container to show selected employee
    function select(card){
        let birthday = new Date(card.dob.date).toLocaleDateString('en-US');
       $modal = $(`<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${card.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${card.name.first} ${card.name.last}</h3>
                        <p class="modal-text">${card.email}</p>
                        <p class="modal-text cap">${card.location.city}</p>
                        <hr>
                        <p class="modal-text">${card.phone}</p>
                        <p class="modal-text">${card.location.street}, 
                        ${card.location.city} , ${card.location.state} ${card.location.postcode} </p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`);
            $('.modal-container').remove();     
        $("body").append($modal);
//Check if selected employee is first or last to remove prev or next button
        if (selectedIndex == 0) {
            $('#modal-prev').hide();
        } else if (selectedIndex == data.results.length - 1) {
            $('#modal-next').hide();
        }

//Remove modal container when click on X
        $(".modal-close-btn").on("click", function (e) {
            $('.modal-container').remove();    
            
        });
//Previous button change to previous employee, remove previous if first employee
        $(".modal-prev").on("click", function (e) {
            selectedIndex--
            if(selectedIndex==0){
                select(data.results[selectedIndex])
                $('#modal-prev').remove();
            }else{
            select(data.results[selectedIndex])
            }
 
        });
//Next button change to next employee, remove next if last employee
        $(".modal-next").on("click", function (e) {
            selectedIndex++
            if(selectedIndex==data.results.length-1){
                select(data.results[selectedIndex])
                $('#modal-next').remove();
            }else{
            select(data.results[selectedIndex])
            }
        });

    }
//Add search input
    $search = $(`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`);
    $(".search-container").append($search);

//Function to search for matching 
$(".search-submit").on("click", function (e) {
        let text = $('.search-input').val().toLowerCase();

        let items = document.getElementsByTagName('h3');
        Array.from(items).forEach(function (item) {
            if (item.innerHTML.indexOf(text) == -1){
                
                item.parentElement.parentElement.style.display= 'none';
    
            }else{
                item.parentElement.parentElement.style.display= 'flex'; 
            }
        });
    });
});







