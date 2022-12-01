const promise = new TeacherApi();
//setup when create


promise.getTeacherApi()
    .then((response) => {
        let html = "";
        let table = "";
        response.data.forEach((person,index) => {
            if (person["loaiND"] === "GV") {
                html += `
                <div class="col-sm-6 col-lg-3 animate__animated animate__fadeIn wow animate__delay-1s ">
                    <div class="card">
                        <img src="./assets/images/${person.hinhAnh}" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <span class="card-country">${person.ngonNgu}</span>
                            <h5 class="card-title">${person.hoTen}</h5>
                            <p class="card-text">${person.moTa}</p>
                        </div>
                    </div>
                </div> 
                `
            }
            table += `
                <tr>
                    <td>${index+1}</td>
                    <td>${person.taiKhoan}</td>
                    <td>${person.matKhau}</td>
                    <td>${person.hoTen}</td>
                    <td>${person.email}</td>
                    <td>${person.ngonNgu}</td>
                    <td>${person.loaiND}</td>
                    <td><button class="btn btn-danger"></button><button class="btn btn-warning"></button></td>
                </tr>
            `
        });
        document.getElementById("teacher").innerHTML = html;
        document.getElementById("tblDanhSachNguoiDung").innerHTML = table;
    })
    .catch((error) => { })
    .finally(() => { })



