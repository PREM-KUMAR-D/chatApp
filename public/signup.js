const signupForm = document.querySelector('form');

const host = 'localhost';
const port = '3000';

signupForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;

    try{
        const data = await axios.post(`http://${host}:${port}/user/signup`,{
            name:name,
            email:email,
            phone: phone,
            password:password
        });
        
        alert(data.data.message);
    }
    catch(error){
        console.log(error);
        alert(error.message);
    }

})