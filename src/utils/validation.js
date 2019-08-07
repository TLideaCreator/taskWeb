export default{
    notEmptyRule($emptyMsg){
        return [
            v => !!v || $emptyMsg,
        ]
    }
}
