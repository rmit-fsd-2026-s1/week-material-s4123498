const password = document.getElementById("password");
const strength = document.getElementById("strength");

password.addEventListener("input", () =>{

    if(password.value.length < 6) {
        strength.textContent = "Weak Password";
        strength.style.color = "red";
    }

    else if (password.value.length < 10) {
        strength.textContent = "Medium Password";
        strength.style.color = "orange";
    }

    else {
        strength.textContent = "strong Password";
        strength.style.color = "green";
    }
});