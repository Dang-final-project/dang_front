import Swal from "sweetalert2";
// <BasicPopup>삭제</BasicPopup>라고 쓰면 삭제 되었습니다 라고 뜨는 형태

const BasicPopup = ({ children }) => {
    const popup = () =>
        Swal.fire({
            title: `${children} 되었습니다`,
            icon: "success",
            width: 400,
            confirmButtonColor: "#336dff", //팔레트 만들어지면 primary로 바꾸기
        });

    return <button onClick={() => popup()}>{children}하기</button>;
};

export default BasicPopup;
