// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

//status scripts
$(document).ready(function(){
    $.getJSON('/incident/open', function(data){
        console.log(data);
        if (data.length > 0) {
            $(".system-status-down").show();
        }else {
            $(".system-status-ok").show();
        }
        var incident = data;
        var cList = $('.incidentList')
        $.each(incident, function(i){
            console.log(incident[i]);

            var div = $('<div/>')
            .html(incident[i].title + " > " + incident[i].status + " &nbsp; " +
            "<input type='radio' name='incident' class='form-check-input incident-delete-checkbox' data-incident-id='"+incident[i]._id+"'>")
            .appendTo(cList);

        });

        // attach click handler to ' close incident' links
        $('.close-incident-link').click(function(e){
            var clickedIncidentId = $(this).data('incident-id');
            console.log(clickedIncidentId);
            $.ajax({
                url: '/CloseIncident',
                type: 'PUT',
                data: {incidentId:clickedIncidentId},
                success: function(response) {
                    alert('incident Closed');
                    location.reload();

                }
            });
        });
        $('#delete-incident-button').click(function(e){
            console.log('hi');
            var selectedIncident = $(".incident-delete-checkbox:checked");
            if (selectedIncident[0]){
                console.log(selectedIncident[0]);
                var selectedIncidentId = $(selectedIncident[0]).data('incident-id');
                console.log(selectedIncidentId);
                $.ajax({
                    url: '/CloseIncident',
                    type: 'PUT',
                    data: {incidentId:selectedIncidentId},
                    success: function(response) {
                        alert('incident Closed');
                        location.reload();

                    }
                });
            }else {
                alert("Select Incident befor you can close it ");
            }

        });

        $("#add-incident-button").click(function(e){
            var status = $("#incidentStatus").val();
            var title = $("#incidentTitle").val();

            $.post('/incident', {title:title , status:status})
            .done(function(data){
                console.log("Data Loaded: " + data );
                location.reload();
            });
            console.log(title);
        });

    });
});
