class TeacherApi {
    constructor(){
        this.url = "https://637b699c6f4024eac20ce16d.mockapi.io/api/Product";
    }
    getTeacherApi(){
        return axios({
            url:this.url,
            method:"GET"
        })
    }
    
    getTeacherApiById(id){
        return axios({
            url:`${this.url}/${id}`,
            method:"GET"
        })
    }

    postTeacherApi(teacher){
        return axios({
            url:this.url,
            method:"POST",
            data: teacher
        })
    }
    putTeacherApi(teacher,id){
        return axios({
            url:`${this.url}/${id}`,
            method:"PUT",
            data:teacher
        })
    }
    deleteTeacherApi(id){
        return axios({
            url:`${this.url}/${id}`,
            method:"DELETE",
           
        })
    }

}