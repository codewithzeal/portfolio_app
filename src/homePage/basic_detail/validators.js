export const  validateName=(fullName)=>{
    const regex=/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
    if(regex.test(fullName)||/\d/.test(fullName))
    return false;
    return true;
}


export const validateEmail=(email)=>{
    const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(regex.test(email))
    return true;
    return false;
}

export const validateContacts=(contacts)=>{
    if(contacts.length===10&&!isNaN(parseInt(contacts)))
    return true
    return false
}

export const validateLinkedInUrl=(url)=>{
    const regex=/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    if(regex.test(url))
    return true;
    return false;
}

