const regDiv = document.getElementById('register');
const loginDiv = document.getElementById('login');

   
const loginAnimate = () => {
    regDiv.style.transform += 'rotateZ(360deg)';
    loginDiv.style.transform += 'rotateZ(0deg)';
    regDiv.style.transform += 'rotateX(180deg)';
    loginDiv.style.display += 'flex'
    regDiv.style.display += 'none'

};

const registerAnimate = () => {
    loginDiv.style.transform += 'rotateZ(-360deg)';
    regDiv.style.transform += 'rotateZ(360deg)';
    regDiv.style.display += 'flex';
    loginDiv.style.display += 'none'
};

