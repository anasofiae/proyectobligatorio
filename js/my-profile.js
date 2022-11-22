let formProfile = document.forms['profile-form'];
let inputImg = document.getElementById("img-profile-file");
let imgProfile = document.getElementById("profile-image");


// Show email on input
formProfile.email.value = localStorage.getItem('userEmail');
//Show values
formProfile.name1.value = localStorage.getItem('firstName');
formProfile.name2.value = localStorage.getItem('secondName');
formProfile.surname1.value = localStorage.getItem('surname');
formProfile.surname2.value = localStorage.getItem('secondSurname');
formProfile.phone.value = localStorage.getItem('phoneNumber');
// Show image
if (localStorage.getItem('imageProfile') != null){
    imgProfile.src = localStorage.getItem('imageProfile');
} else{
    imgProfile.src = 'img/img_perfil.png';
};

// Image file
inputImg.addEventListener('change', () =>{

    let fileread = new FileReader();
    fileread.readAsDataURL(inputImg.files[0]);
    fileread.addEventListener('load', () =>{
        const URL_IMG = fileread.result;
        //show profile image
        imgProfile.src = (URL_IMG);
        localStorage.setItem('imageProfile', URL_IMG);
    })
})

// Save changes
formProfile.addEventListener('submit', () => {
   
  // Save name
   localStorage.setItem('firstName', formProfile.name1.value);
   // Save second name
   if(formProfile.name2.value.length > 0){
    localStorage.setItem('secondName', formProfile.name2.value);
   } 
   // Save first surname
    localStorage.setItem('surname',  formProfile.surname1.value);
   // Save second surname
   if( formProfile.surname2.value.length > 0){
    localStorage.setItem('secondSurname',  formProfile.surname2.value);
   }
   // Save phone number
   localStorage.setItem('phoneNumber', formProfile.phone.value);

});
