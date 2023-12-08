
const registerUser = async()=>{
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email1').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

 const registerData = {firstName, lastName, email, phone, password};
console.log(registerData)

// declaring request type
   try{ const host = 'http://localhost:786/api/register';

    const fetchOptions = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(registerData),
    }
   const response = await fetch(host, fetchOptions)
   
   const responseData = await response.json();

  if (response.ok) {
      console.log(responseData);
      alert(responseData.message)

    } else {
      // Handle non-2xx status codes (e.g., server error)
      console.error('Error:', response.status, response.statusText, responseData.error);
      alert(responseData.error)
    }

  }catch(error){
   console.log(error)
  }

}
const loginUser = async ()=>{
try {
    const email=  document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
const loginData = {email, password}

const fetchUrl = 'http://localhost:786/api/login'

    const fetchOptions = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(loginData)
    }

   const response = await fetch(fetchUrl, fetchOptions)
  const responseData = await response.json();

  if(response.ok){
    alert(responseData.message)
    console.log(responseData)
  }else{
    alert(responseData.error)
  }

} catch (error) {
    
}
}