console.log('Welcome to client side js.');

const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2')



form.addEventListener('submit', (e)=>{
    e.preventDefault();

    message1.textContent = 'Loading';
    message2.textContent = '';

    fetch(`/address?address=${search.value}`).then((response)=>{
    response.json().then(data=>{
        if(data.error){
            message1.textContent = data.error;
        }
            
        else{
            message1.textContent = `The location you have entered is ${data.location}.`
            message2.textContent = `Current temperature here is ${data.current_temperature}'C, and it feels like ${data.feels_like}'C. HI PSI.`;
        }
    })
});
})
