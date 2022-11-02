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

export const validateAge=(age)=>{
    if(!isNaN(parseInt(age))&&age>0&&age<200)
    return true;
    return false;
}


export const validatePincode=(pincode)=>{
    if(!isNaN(parseInt(pincode))&&pincode>=100000)
    return true
    return false
}

export const cgpaValidator=(cgpa)=>{
    let res=cgpa.split("/")
    
    if(!isNaN(parseInt(res[0]))&&!isNaN(parseInt(res[1])))
    {
        let num=parseInt(res[0])
        let denom=parseInt(res[1])
        if(num<=denom&&num>0&&denom>0&&num<=10&&denom<=10)
        return true
    }
    return false
}


export const addressValidator=(address)=>{
    let regex=/^[a-zA-Z0-9\s,'-\/]*$/
    if(regex.test(address))
    return true
    return false
}
