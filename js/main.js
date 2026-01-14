var r = document.querySelector(':root');

function myFunction_get(propertyName) {
    var rs = getComputedStyle(r);
    return rs.getPropertyValue(propertyName);
}

function toggleTheme() {
    var toggleSwitch = document.querySelector('.togglesw');

    if (toggleSwitch.checked) {
        r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-light'));
        r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-light'));
        r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-light'));
        r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-light'));
        r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-light'));
        r.style.setProperty('--cardBgColor', myFunction_get('--cardBgColor-light'));
        r.style.setProperty('--accentColor', myFunction_get('--accentColor-light'));
        r.style.setProperty('--glass-border', myFunction_get('--glass-border-light'));
    } else {
        r.style.setProperty('--mainTextColor', myFunction_get('--mainTextColor-dark'));
        r.style.setProperty('--secondaryTextColor', myFunction_get('--secondaryTextColor-dark'));
        r.style.setProperty('--mainLinkColor', myFunction_get('--mainLinkColor-dark'));
        r.style.setProperty('--mainBorderColor', myFunction_get('--mainBorderColor-dark'));
        r.style.setProperty('--mainBgColor', myFunction_get('--mainBgColor-dark'));
        r.style.setProperty('--cardBgColor', myFunction_get('--cardBgColor-dark'));
        r.style.setProperty('--accentColor', myFunction_get('--accentColor-dark'));
        r.style.setProperty('--glass-border', myFunction_get('--glass-border-dark'));
    }
}

// Initial theme setting
toggleTheme();
