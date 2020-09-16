function CapitalizeFirstLetter(str){
    return str.substring(0,1).toUpperCase()+str.substring(1).toLowerCase()
}

function beautifyName(name){ 
    return CapitalizeFirstLetter(name)       
}

module.exports = beautifyName