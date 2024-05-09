import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// 제목 넣고 싶을 때 -> <ContentsPopup title="title"></ContentsPopup>
// 내용 넣고 싶을 때 -> <ContentsPopup>안녕하세요</ContentsPopup>

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Local2({ title, children }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: "500px", height: "500px" },
        ...(title && { dividers: true }),
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                지역
                {/* 카드 만들어지면 import 하기 */}
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title"></DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <StyledInput type="text" className="underline-input" placeholder="예) 판교역166" />
                <Button type='submit'>검색</Button>
                <DialogContent {...dialogContentProps}>
                  <div>
                      <h1>tip</h1>
                      <h2>아래와 같은 조합으로 검색을 하시면 <br />
                          더욱 정확한 결과가 검색됩니다.
                      </h2>
                      <h3>도로명 + 건물 번호</h3>
                      <p>예) 판교역로 166, 제주 첨단로242</p>
                      <h3>지역명(동/리) + 번지</h3>
                      <p>예) 백현동 532, 제주 영평동 2181</p>
                    </div></DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const StyledInput = styled('input')`
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
    width: 75%
`;
