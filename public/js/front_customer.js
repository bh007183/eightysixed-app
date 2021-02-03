// changes the account creation to either a customer or a business
const accountValue = [false];
$(".switch").on("change", function (event) {
  event.preventDefault();
  accountValue.unshift($(".toggle").prop("checked"));
  if (accountValue.length > 1) {
    accountValue.pop();
  }
});

// triggers the modal for signing in and sends the info to check if correct
$(".sign-button").on("click", function (event) {
  event.preventDefault();

  // conditional if sign in is correct
  if (accountValue[0] === true) {

    $.post("/api/customer/login", {
      password: $(".sign_pass").val(),
      email: $(".sign_email").val(),
      
    })
      .then((response) => {
        $.get("/customer-profile/" + response.id, {}).then((res) => {
          window.location.href = "/customer-profile/" + response.id;
          localStorage.setItem("id", response.id);
      
        });
      })
      .fail((err) => {
        console.log(err);
        alert("Sign-in failed");
      });
  }
  // conditional if sign in is wrong
  if (accountValue[0] === false) {
    event.preventDefault();
    $.post("/api/business/login", {
      email: $(".sign_email").val(),
      password: $(".sign_pass").val(),
    })
      .then((response) => {
        $.get("/business-main/" + response.id, {}).then((res) => {
          window.location.href = "/business-main/" + response.id;
          localStorage.setItem("id", response.id);
        });
      })
      .fail((err) => {
        console.log(err);
        alert("Incorrect Username or Password");
      });
  }
});
// customer search function allows the user to search the customer DB for a customer
$(".customer_search").on("click", function (event) {
  event.preventDefault();
  $.get("/search-results/" + $(".firstName-search").val(), {}).then((res) => {
    window.location.href = "/search-results/" + $(".firstName-search").val();
    $(".firstName-search").val("");
  });
});

$(".claim_button_set").on("click", function(event){
  event.preventDefault()
  let setPass = $(".set_pass").val();
  let confirmPass = $(".confirm-password").val();
  if(setPass === confirmPass){
    $("#modal6").hide()
  const customerClaim = {
      email: $(".claim_email").val(),
      password: $(".set_pass").val(),
      isClaimed: 1
  }

$.ajax({
  url: "/api/customer",
  method: "PUT",
  data: customerClaim
}).then(res=>{
  console.log(res)
  location.reload()

})

}
}) 


