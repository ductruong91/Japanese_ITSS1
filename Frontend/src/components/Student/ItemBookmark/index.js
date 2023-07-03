import classNames from "classnames/bind";
import styles from "./ItemBookmark.module.scss";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { bookmarkApi } from "../../../services/bookmark-api";

const cx = classNames.bind(styles);

function ItemBookmark({ teacher }) {
  const navigate = useNavigate();
  const handleDetailInfo = (event) => {
    event.preventDefault();
    navigate(`/info/${teacher.teacher_id}`);
  };

  const handleDeleteBookmark = async () => {
    try {
      const res = await bookmarkApi.deleteBookmark({
        studentId: 51,
        teacher_profile_id: 131,
      });
      console.log("Success: ", res);
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.log("Error deleting bookmark: ", error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };
  return (
    <div className={cx("giaovien")}>
      <div className={cx("cot1")}>
        <Avatar
          alt="Remy Sharp"
          src={teacher.image}
          sx={{ width: 112, height: 112 }}
        />
      </div>
      <div className={cx("cot2")}>
        <h4>{teacher.mail}</h4>
        <div className={cx("rating")}>
          <i className={cx("fa fa-star")}></i>
          <i className={cx("fa fa-star")}></i>
          <i className={cx("fa fa-star")}></i>
          <i className={cx("fa fa-star")}></i>
          <i className={cx("fa fa-star")}></i>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisic elit. Tempora aperiam
          fuga dolorem consequa, sunt, reiciendis quo neque dolores{" "}
          {teacher.mail}
        </p>
      </div>
      <div className={cx("cot3")}>
        <Button
          onClick={handleDetailInfo}
          variant="contained"
          sx={{
            backgroundColor: "var(--primary)",
            color: "black",
            fontSize: 16,
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "var(--primary-hover)",
            },
          }}
        >
          もっと詳しく
        </Button>

        <Button
          onClick={handleDeleteBookmark}
          variant="contained"
          sx={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          削除
        </Button>
      </div>
    </div>
  );
}
export default ItemBookmark;
