// var r = document.querySelector(':root');

// function myFunction_get(propertyName) {

//     var rs = getComputedStyle(r);
//     return rs.getPropertyValue(propertyName);
// }

// function myFunction_set_dark() {
//     var lightButton = document.getElementById('button--light');
//     var darkButton = document.getElementById('button--dark');
//     darkButton.setAttribute('hidden', true);
//     lightButton.removeAttribute('hidden');
//     r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-dark'));
//     r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-dark'));
//     r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-dark'));
//     r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-dark'));
//     r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-dark'));
// }

// function myFunction_set_light() {
//     var lightButton = document.getElementById('button--light');
//     var darkButton = document.getElementById('button--dark');
//     lightButton.setAttribute('hidden', true);
//     darkButton.removeAttribute('hidden');
//     r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-light'));
//     r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-light'));
//     r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-light'));
//     r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-light'));
//     r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-light'));
// }

// myFunction_set_dark();



var r = document.querySelector(':root');

function myFunction_get(propertyName) {
    var rs = getComputedStyle(r);
    return rs.getPropertyValue(propertyName);
}

function toggleTheme() {
    var lightButton = document.querySelector('.indicator.left');
    var darkButton = document.querySelector('.indicator.right');
    var toggleSwitch = document.querySelector('.togglesw');

    if (toggleSwitch.checked) {
        lightButton.style.display = 'block';
        darkButton.style.display = 'none';
        r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-light'));
        r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-light'));
        r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-light'));
        r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-light'));
        r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-light'));
    } else {
        lightButton.style.display = 'none';
        darkButton.style.display = 'block';
        r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-dark'));
        r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-dark'));
        r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-dark'));
        r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-dark'));
        r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-dark'));
    }
}

// Initial theme setting
toggleTheme();
