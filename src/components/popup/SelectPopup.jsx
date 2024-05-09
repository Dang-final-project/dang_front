import Swal from "sweetalert2";

const SelectPopup = ({ title, children }) => {
    const popup = () =>
        Swal.fire({
            title,
            // html: "<textarea></textarea>",
            // icon: "warning",
            showCancelButton: true,
            cancelButtonText: "취소",
            confirmButtonText: "완료",
            confirmButtonColor: "#336dff",
            customClass: {
                cancelButton: "swal-cancel",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "완료되었습니다!",
                    icon: "success",
                    confirmButtonText: "확인",
                });
            }
        });
    return (
        <>
            <button onClick={() => popup()}>버튼</button>;
        </>
    );
};

export default SelectPopup;
