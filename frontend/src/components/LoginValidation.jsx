function validation(values){
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.email === ''){
        error.email = 'Email should not be empty'
    }
    else if(!email_pattern.test(values.email)){
        error.email = 'Email did not match'
    }
    else{
        error.email = ''
    }


    return error
}

export default validation