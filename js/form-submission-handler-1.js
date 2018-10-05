(function() {
  function validEmail(email) { // see:
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData() {
    var form = document.getElementById("gform");
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
      return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });

  var formData = {};
  fields.forEach(function(name){
    var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || "srivastava.amrti1999@gmail.com"; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var data = getFormData();         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */

    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
      var invalidEmail = document.getElementById("email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(event.target);
      var url = event.target.action;  //
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
          document.getElementById("gform").style.display = "none"; // hide form
          var thankYouMessage = document.querySelector("#thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
        };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
      }).join('&')
      xhr.send(encoded);
    }
  }
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var form = document.getElementById("gform");
    form.addEventListener("submit", handleFormSubmit, false);
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();


function addFields(){
  var number = document.getElementById("member").value;
  var container = document.getElementById("member-details");
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  if (number < 3 || number > 5){
    var error = document.getElementById("limit");
    error.innerHTML = "Team size should be 3 to 5 members";
    error.style.display="block";
  }
  else{
    var error = document.getElementById("limit");
    error.style.display = "none";
    for (i=0;i<number-1;i++){
      var member = document.createElement("h4");
      member.class = "col-md-12 col-sm-12 col-xs-12";
      member.style = "text-decoration: underline;";
      member.innerHTML = "Member "+(i+2)+" Details";
      container.appendChild(member);
      var label_name = document.createElement("label");
      var input_name = document.createElement("input");
      var label_email = document.createElement("label");
      var input_email = document.createElement("input");
      label_name.for = "member-name"+(i+2);
      label_name.setAttribute("class","col-md-6 col-sm-6 col-xs-12");
      label_name.innerHTML = "Member Name";
      input_name.setAttribute("class","col-md-6 col-sm-6 col-xs-12 control-label");
      input_name.type = "text";
      input_name.placeholder = "Member "+(i+2)+" Name";
      input_name.required = "";
      input_name.name = "member-name"+(i+2);
      input_name.id = "member-name"+(i+2);
      container.appendChild(label_name);
      container.appendChild(input_name);
      label_email.for = "member-email"+(i+2);
      label_email.innerHTML = "Member Email";
      label_email.setAttribute("class","col-md-6 col-sm-6 col-xs-12");
      input_email.type = "email";
      input_email.setAttribute("class","col-md-6 col-sm-6 col-xs-12 control-label");
      input_email.placeholder = "Member "+(i+2)+" Email";
      input_email.required = "";
      input_email.name = "member-email"+(i+2);
      input_email.id = "member-email"+(i+2);
      container.appendChild(label_email);
      container.appendChild(input_email);
      var label_contact = document.createElement("label");
      var input_contact = document.createElement("input");
      label_contact.for = "member-contact"+(i+2);
      label_contact.innerHTML = "Member Contact No.";
      label_contact.setAttribute("class","col-md-6 col-sm-6 col-xs-12");
      input_contact.type = "number";
      input_contact.setAttribute("class","col-md-6 col-sm-6 col-xs-12 control-label");
      input_contact.max = "9999999999x";
      input_contact.placeholder = "Member "+(i+2)+" Conatct No.";
      input_contact.required = "";
      input_contact.name = "member-contact"+(i+2);
      input_contact.id = "member-contact"+(i+2);
      container.appendChild(label_contact);
      container.appendChild(input_contact);
    }
  }
}