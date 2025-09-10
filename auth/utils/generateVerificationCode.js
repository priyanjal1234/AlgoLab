function generateVerificationCode() {
    const nums = "0123456789"
    const sp = nums.split("")
    let result = ""
    for(let i = 0 ; i < 4 ; i++) {
        let randomIndex = Math.floor(Math.random() * sp.length)
        result = result + nums[randomIndex]
    }

    return result
}


export default generateVerificationCode