let passwordClone = document.querySelector('#confirm-password');
let password = document.getElementById('password');
console.log(passwordClone);
function passwordIsNotSame () {
  return password.value !== passwordClone.value;
}

document.getElementById('signup-form').addEventListener('submit', event => {
  if(passwordIsNotSame()) {
    event.preventDefault();
    passwordClone.setCustomValidity("Passwords Don't Match");
  }
})
