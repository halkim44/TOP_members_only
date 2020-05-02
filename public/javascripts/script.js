let passwordClone = document.querySelector('#confirm-password');
let password = document.getElementById('password');
let signupBtn = document.getElementById('signup-btn');

function passwordCheck() {
  if (passwordClone.value.length >= 8) {
    if(password.value !== passwordClone.value) {
      passwordClone.setCustomValidity("Passwords Don't Match");
    }else {
      passwordClone.setCustomValidity("");
    }
  }
  console.log('cek')
}
passwordClone.addEventListener('keyup', passwordCheck);