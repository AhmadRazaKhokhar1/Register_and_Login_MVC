//base url
let baseUrl;

if (window.location.href.indexOf("https") === -1) {
    baseUrl = "http://localhost:786";
} else {
    baseUrl = "http://localhost:786";
}

//register
const registerUser = async()=>{
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email1').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {    
        // const userData = {firstName, lastName, email, phone, password};
      const response =  await axios.post(`${baseUrl}/api/register`, {
            firstName:firstName,
            lastName:lastName,
            email:email.toLowerCase().trim(),
            phone:phone.trim(),
            password:password
        });
        console.log(response.data.message)
        console.log(response.data.result)
        console.log(response.data.token)
        if(response.status===201){
            alert(response.data.message);
            
            console.log(response.statusText)
            console.log(response.status)
    
           localStorage.setItem('token', response.data.token);
           const storedToken = localStorage.getItem('token')
           console.log(storedToken);
        }else{    
            alert(response.data.message);
            
            console.log(response.request.statusText)
            console.log(response.request.status)
    
        }
    
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email1').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('password').value = '';
} catch (error) {
 console.error(error)   
}
}
//login
const loginUser = async ()=> {
    const email = document.getElementById('email2').value;
    const password = document.getElementById('password2').value;
    try {
        const response = await axios.post(`${baseUrl}/api/login`, {
            email:email,
            password:password,
        });
        const status = await response.status;
        console.log(status);
        if(status===200){
            alert(response.data.message);
            alert('Hi ' + response.data.userData.firstName + ' welcome back!');
            console.log(response.data);
            const data = response.data;
            console.log(data)

        }
        else{
            alert(error.data.message);
        }
    } catch (error) {
        console.log('ERROR in login: '+error)
    }
}
//ge all users
const getUser = async ()=> {
    try {
        const response = await axios.get(`${baseUrl}/api/data`);
        const responseData = response.data.dataFetched;
        const data = responseData;
        console.log(data);
    
         data.map(user=>{
          const userDataFetched = `
        <link href="style.css" rel="stylesheet" />
    <br/>
        <div class='output' id='user_${user._id}'>
        <h1>User Details</h1> <br/>
        <hr>
          <p><b>ID:</b><span>${user._id}</span></p><br/>
          <p><b>First Name:</b><span>${user.firstName}</span></p><br/>
          <p><b>Last Name:</b><span>${user.lastName}</span></p><br/>
          <p><b>Email:</b><span>${user.email}</span></p><br/>
          <p><b>Phone:</b><span>${user.phone}</span></p><br/>

          <button onclick="deleteUser('${user._id}')" >Delete</button>
          <button onclick="updateUser('${user._id}')" >Edit</button>
          </div>
          <br/>

          `
          document.getElementById('message').innerHTML += userDataFetched;
        });
      } catch (error) {
        console.error(error);
      }
      
    }
    //delete user by his id:
    async function deleteUser(id){
        let  response;
                await axios.delete(`${baseUrl}/api/deleteuser/${id}`)
                .then(function(){
                    console.log(response);
                     // Remove the deleted user from the displayed list
                        const user = document.getElementById(`user_${id}`);
                        if (user) {
                            user.remove();
                            alert(response.message)
                        }
                })
                .catch(function(error){
                   console.log(`Error on Delete API: ${error}`);
                   alert(response.message)
                });
            }
            
            //update user by his id:
            const updateUser = async (id)=>{
                let response;
                try {
                    await axios.get(`${baseUrl}/api/updateuser/${id}`);
                    if(response){
                        const user = response.data;
                        console.log(user)
                        document.getElementById('update').innerHTML +=`
                        <link href="style.css" rel="stylesheet" />
                        <br/>
                            <div class='update' id='user_${user._id}'>
                            <h1>Make your changes</h1> <br/>
                            <hr>
                              <p><b>ID:</b><span>${user._id}</span></p><br/>
                              <p><b>First Name:</b><span>${user.firstName}</span></p><br/>
                              <p><b>Last Name:</b><span>${user.lastName}</span></p><br/>
                              <p><b>Email:</b><span>${user.email}</span></p><br/>
                              <p><b>Phone:</b><span>${user.phone}</span></p><br/>
                    
                              <button onclick="Update('${user._id}')" >Update</button>
                              </div>
                              <br/>  
                        `
            
                    }
                } catch (error) {
                    
                }
                

}