function validation(values){
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(values.name === ''){
        error.name = 'Name should not be empty'
    }
    else{
        error.name = ''
    }

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