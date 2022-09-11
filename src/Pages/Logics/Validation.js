
const Validation = () => {
  return "Hello Validation";
}
const RegisterForm = (username,useremail,usermobile,userpassword) => {
    if(username.trim().length < 3){
        alert("Name must be greater than 3 letter.");
        return false;
    }
    if(useremail.trim().length < 7){
        alert("Please enter a valid email!");
        return false;
    }
    if(!useremail.includes("@") || !useremail.includes(".")){
        alert("Please enter a valid email...");
        return false;
    }
    if(usermobile.trim().length < 10 || usermobile.trim().length >= 12){
        alert("Please enter a valid Mobile number");
        return false;
    }
    if(usermobile[0]==="1" || usermobile[0]==="2" || usermobile[0]==="3" || usermobile[0]==="4" || usermobile[0]==="5" || usermobile[0]==="0"){
        alert("Please enter a valid Mobile number..");
        return false;
    }
    if(isNaN(usermobile)){
        alert("Please enter a valid Mobile number..");
        return false;
    }
    if(userpassword[0] === " " || userpassword[userpassword.length-1] === " "){
        alert("You cannot use space at first and last position of password...");
        return false;
    }
    if(userpassword.trim().length < 6 ){
        alert("Password must be equal or greater than 6 letter..");
        return false;
    }
    username = username.trim();
    useremail = useremail.trim().toLowerCase();
    usermobile = usermobile.trim();
    userpassword = userpassword.trim();
    const docs = {
        username : username,
        useremail : useremail,
        usermobile : usermobile,
        userpassword : userpassword
    }
    return docs;
}

const LoginForm = (useremail,userpassword) => {
    if(useremail.trim().length < 7){
        alert("Please enter a valid email!");
        return false;
    }
    if(!useremail.includes("@") || !useremail.includes(".")){
        alert("Please enter a valid email...");
        return false;
    }
    if(userpassword.trim().length < 6 ){
        alert("Please enter a valid password!");
        return false;
    }
    useremail = useremail.trim().toLowerCase();
    userpassword = userpassword.trim();
    const docs = {
        useremail : useremail,
        userpassword : userpassword
    }
    return docs;
}

export default Validation;
export {RegisterForm,LoginForm};