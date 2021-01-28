$(document).ready( function() {
    // The .dropdown() and .modal() functions were not working, so these initializations
    // for dropdowns and modals had to be done in vanilla Javascript.
    const dropdownElems = document.querySelectorAll('.dropdown-trigger');
    const dropdownInstances = M.Dropdown.init(dropdownElems, "hover");
    const modalElems = document.querySelectorAll('.modal');
    const modalInstances = M.Modal.init(modalElems);

    // Submits sign-up form
    $(".sign-up-button").on("click", function(event){
        // event.preventDefault()
        let pass = $("#password").val()
        let confirm = $(".verify-password").val()
        const companieData = {
            name: $(".company_name").val(),
            password: pass,
            email: $(".company_email").val()
        }

        if(pass === confirm){
            $(".verify-password").addClass("valid")
            $.ajax({
                url: "api/",
                method: "POST",
                data: companieData
            })
        } else {
            // If password does not match
            $(".verify-password").addClass("invalid").val('').attr("placeholder", "Password does not match!")
        }
    })
});