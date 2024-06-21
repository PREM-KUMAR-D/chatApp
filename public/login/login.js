const loginForm = document.querySelector('form');

const host = 'localhost';
const port = '3000';

loginForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    
    
    
    try{
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const token = localStorage.getItem('token');
        const data = await axios.post(`http://${host}:${port}/user/login`, {
            email: email,
            password: password
        });
    
        console.log(data);
        
        
        alert(data.data.message);
    }
    catch(error){
        console.log(error);
        alert(error.response.data.message);
    }

})