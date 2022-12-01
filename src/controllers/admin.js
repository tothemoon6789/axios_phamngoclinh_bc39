const promiseAdmin = new TeacherApi();
const hel = new Helper();
const val = new Validate();
//setup when create

const renderTable = () => {
    promiseAdmin.getTeacherApi()
        .then((response) => {

            let table = "";
            response.data.forEach((person, index) => {

                table += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${person.taiKhoan}</td>
                    <td>${person.matKhau}</td>
                    <td>${person.hoTen}</td>
                    <td>${person.email}</td>
                    <td>${person.ngonNgu}</td>
                    <td>${person.loaiND}</td>
                    <td>
                    <button class="btn btn-danger" onclick="deletePerson(${person.id})">Xóa</button>
                    <button 
                    class="btn btn-warning" 
                    onclick="modifyPerson(${person.id})"
                    data-toggle="modal"
                    data-target="#myModal"
                    >Sửa</button>
                    </td>
                </tr>
            `
            });
            document.getElementById("tblDanhSachNguoiDung").innerHTML = table;
        })
        .catch((error) => { })
        .finally(() => { })
}
renderTable();
hel.getEle("btnThemNguoiDung").onclick = () => {

    // test
    document.getElementById("TaiKhoan").value = "";
    document.getElementById("HoTen").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("MatKhau").value = "";
    document.getElementById("HinhAnh").value = "Nhập vào hình ảnh";
    document.getElementById("loaiNguoiDung").value = "Chọn loại người dùng";
    document.getElementById("loaiNgonNgu").value = "Chọn ngôn ngữ";
    document.getElementById("MoTa").value = "";
}

hel.getEle("add").onclick = () => {
    let flat = true;
    // kiem tra lai khong duoc trung
    const acount = val.vali("TaiKhoan", /^\w+$/, "Tài khoản không để trống, không chứa mảng trắng, không được trùng");
    const name = val.vali("HoTen", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/, "Tên không được để trống, không chứa số và ký tự đặc biệt");
    const email = val.vali("Email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email không để trống, đúng format email");
    const password = val.vali("MatKhau", /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,8}$/, "Mật khẩu không để trống, có ít nhất 1 ký tự in hoa, 1 ký tự đặt biệt, 1 ký tự số, độ dài từ 6-8 ký tự");
    const image = val.vali("HinhAnh", /^[\w\.]+$/, "Hình ảnh không để trống");
    const person = val.vali("loaiNguoiDung", /[^Chọn loại người dùng]/, "Phải chọn");
    const language = val.vali("loaiNgonNgu", /[^Chọn ngôn ngữ]/, "Phải chọn");
    const description = val.vali("MoTa", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\r\n\,\.]{1,60}$/, "Không để trống, không vượt quá 60 ký tự");
    flat &&= acount;
    flat &&= name;
    flat &&= email;
    flat &&= password;
    flat &&= image;
    flat &&= person;
    flat &&= language;
    flat &&= description;
    if (!flat) return;
    const push = () => {

        const teacher = new Teacher(
            hel.getValEle("TaiKhoan"),
            hel.getValEle("HoTen"),
            hel.getValEle("MatKhau"),
            hel.getValEle("Email"),
            hel.getValEle("HinhAnh"),
            hel.getValEle("loaiNguoiDung"),
            hel.getValEle("loaiNgonNgu"),
            hel.getValEle("MoTa")
        )
        hel.disableInput(["TaiKhoan", "HoTen", "Email", "MatKhau", "HinhAnh", "loaiNguoiDung", "loaiNgonNgu", "MoTa", "add"])

        promise.postTeacherApi(teacher)
            .then((response) => {
                document.getElementById("myModal").classList.remove("show")
                document.querySelector(".modal-backdrop").classList.remove("show")
                hel.endableInput(["TaiKhoan", "HoTen", "Email", "MatKhau", "HinhAnh", "loaiNguoiDung", "loaiNgonNgu", "MoTa", "add"])
                alert("Thêm thành công!")
                renderTable();
            })
            .catch((error) => { })
            .finally(() => { })

    }
    val.checkAccount("TaiKhoan", "Tài khoản bị trùng", push);
}
const deletePerson = (id) => {
    promiseAdmin.deleteTeacherApi(id)
        .then((response) => {
            alert(`Xóa thành công: id-${id}!`);
            renderTable();
        })
        .catch((error) => { alert(`Xóa thất bại: id-${id}!`); })
        .finally(() => { })
}
const modifyPerson = (id) => {
    promiseAdmin.getTeacherApiById(id)
        .then((response) => {
       
            document.getElementById("add").style.display = "none";
            document.getElementById("update").style.display = "inline-block";
           
            document.getElementById("TaiKhoan").value = response["data"]["taiKhoan"];
            document.getElementById("HoTen").value = response["data"]["hoTen"];
            document.getElementById("Email").value = response["data"]["email"];
            document.getElementById("MatKhau").value = response["data"]["matKhau"];
            document.getElementById("HinhAnh").value = response["data"]["hinhAnh"];
            document.getElementById("loaiNguoiDung").value = response["data"]["loaiND"];
            document.getElementById("loaiNgonNgu").value = response["data"]["ngonNgu"];
            document.getElementById("MoTa").value = response["data"]["moTa"];
        })
        .catch((error) => { })
        .finally(() => { })
        hel.getEle("update").onclick = () => {
            let flat = true;
            // kiem tra lai khong duoc trung
            const acount = val.vali("TaiKhoan", /^\w+$/, "Tài khoản không để trống, không chứa mảng trắng, không được trùng");
            const name = val.vali("HoTen", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/, "Tên không được để trống, không chứa số và ký tự đặc biệt");
            const email = val.vali("Email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email không để trống, đúng format email");
            const password = val.vali("MatKhau", /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,8}$/, "Mật khẩu không để trống, có ít nhất 1 ký tự in hoa, 1 ký tự đặt biệt, 1 ký tự số, độ dài từ 6-8 ký tự");
            const image = val.vali("HinhAnh", /^[\w\.]+$/, "Hình ảnh không để trống");
            const person = val.vali("loaiNguoiDung", /[^Chọn loại người dùng]/, "Phải chọn");
            const language = val.vali("loaiNgonNgu", /[^Chọn ngôn ngữ]/, "Phải chọn");
            const description = val.vali("MoTa", /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\r\n]{10,60}$/, "Không để trống, không vượt quá 60 ký tự");
            flat &&= acount;
            flat &&= name;
            flat &&= email;
            flat &&= password;
            flat &&= image;
            flat &&= person;
            flat &&= language;
            flat &&= description;
            if (!flat) return;
            
            const teacher = new Teacher(
                hel.getValEle("TaiKhoan"),
                hel.getValEle("HoTen"),
                hel.getValEle("MatKhau"),
                hel.getValEle("Email"),
                hel.getValEle("HinhAnh"),
                hel.getValEle("loaiNguoiDung"),
                hel.getValEle("loaiNgonNgu"),
                hel.getValEle("MoTa")
            )
            hel.disableInput(["TaiKhoan", "HoTen", "Email", "MatKhau", "HinhAnh", "loaiNguoiDung", "loaiNgonNgu", "MoTa", "add"])
        
            promise.putTeacherApi(teacher,id)
                .then((response) => {
                    document.getElementById("myModal").classList.remove("show")
                    document.querySelector(".modal-backdrop").classList.remove("show")
                    hel.endableInput(["TaiKhoan", "HoTen", "Email", "MatKhau", "HinhAnh", "loaiNguoiDung", "loaiNgonNgu", "MoTa", "add"])
                    alert("Cập nhật thành công!")
                    renderTable();
                })
                .catch((error) => { })
                .finally(() => { })
           
           
        }
}
hel.getEle("search").onkeyup = () => {
    promiseAdmin.getTeacherApi()
    
    .then((response) => { 
            let hmtl = "";
            let count = 1;
          
           response.data.forEach(person => {
            const taikhoanPerson = person["hoTen"];
            const regex = new RegExp(hel.getValEle("search"),"gi");
         
            if (regex.test(taikhoanPerson)===true) {
                console.log(regex.test(taikhoanPerson)===true);
                hmtl += `
                <tr>
                    <td>${count}</td>
                    <td>${person.taiKhoan}</td>
                    <td>${person.matKhau}</td>
                    <td>${person.hoTen}</td>
                    <td>${person.email}</td>
                    <td>${person.ngonNgu}</td>
                    <td>${person.loaiND}</td>
                    <td>
                    <button class="btn btn-danger" onclick="deletePerson(${person.id})">Xóa</button>
                    <button 
                    class="btn btn-warning" 
                    onclick="modifyPerson(${person.id})"
                    data-toggle="modal"
                    data-target="#myModal"
                    >Sửa</button>
                    </td>
                </tr>
            `
            count++
        }
           });
           document.getElementById("tblDanhSachNguoiDung").innerHTML = hmtl;
         })
        .catch((error) => {  })
        .finally(() => {  })
}