
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
      document.getElementById('firstName').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('email1').value = ''
      document.getElementById('phone').value = ''
      document.getElementById('password').value = ''
   
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

    localStorage.setItem('token', responseData.token);
    console.log('token', responseData.token);

    console.log(responseData)
  }else{
    alert(responseData.error)
  }

} catch (error) {
    
}
}
//for specific id
// const response = await axios.get(`/user?ID=12345`);

async function getUser() {
  try {
    const response = await axios.get(`http://localhost:786/api/data`);
    const responseData = response.data.dataFetched;
    const data = [...responseData]
    console.log(...responseData);
    console.log(data);

     data.map(user=>{
      const userDataFetched = `
    <link href="style.css" rel="stylesheet" />
<br/>
    <div class='output'>
    <h1>User Details</h1> <br/>
    <hr>
      <p><b>ID:</b><span>${user._id}</span></p><br/>
      <p><b>First Name:</b><span>${user.firstName}</span></p><br/>
      <p><b>Last Name:</b><span>${user.lastName}</span></p><br/>
      <p><b>Email:</b><span>${user.email}</span></p><br/>
      <p><b>Phone:</b><span>${user.phone}</span></p><br/>
      </div>
      <br/>
      `
      document.getElementById('message').innerHTML += userDataFetched;
    });
  } catch (error) {
    console.error(error);
  }
}