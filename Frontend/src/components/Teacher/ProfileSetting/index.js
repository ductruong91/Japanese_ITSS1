import classNames from "classnames/bind";
import styles from "./ProfileSetting.module.scss";
import { useEffect, useState } from "react";
import { levels, days } from "../../../data/target";
import { teacherApi } from "../../../services/teacher-api";
import { FaStar } from "react-icons/fa";
import { profileTeacher } from "../../../data/profileTeacher";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const cx = classNames.bind(styles);

function ProfileSetting() {
  const [teacher, setTeacher] = useState({});
  const [resultLevel, setResultLevel] = useState([]);
  const [resultDay, setResultDay] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getTeacher();
  }, []);

  useEffect(() => {
    const level = levels.find((item) => item.id === teacher.level);
    setResultLevel(level ? [level] : []);
  }, [teacher.level]);

  useEffect(() => {
    const day = days.find((item) => item.id === teacher.available_day);
    setResultDay(day ? [day] : []);
  }, [teacher.available_day]);

  const getTeacher = async () => {
    let res = await teacherApi.getTeacher(localStorage.getItem("id"));
    console.log("profile: ", res);
    setTeacher(res);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    let res = await teacherApi.updateProfile(teacher.id, teacher);
    navigate("/profile"); // Chuyển đến trang chính hoặc làm bất kỳ điều gì bạn cần
    toast.success("Update thành công !");
  };

  return (
    <>
      <form className={cx("wrapper")} onSubmit={handleSubmitUpdate}>
        <div className={cx("right")}>
          <img
            className={cx("img-profile")}
            src="data:image/jpeg;base64,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"
          ></img>

          <div className={cx("pd-rating")}>
            <i>
              <FaStar />
            </i>
            <i>
              <FaStar />
            </i>
            <i>
              <FaStar />
            </i>
            <i>
              <FaStar />
            </i>
            <i>
              <FaStar />
            </i>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 70, marginBottom: -4 }}>名前</h4>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              :{" "}
              <input
                value={teacher.last_name}
                style={{ width: 100, padding: "1px 4px", fontSize: 20 }}
              />{" "}
              <input
                value={teacher.first_name}
                style={{ width: 100, padding: "1px 4px", fontSize: 20 }}
              />
            </div>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 58 }}>
              歳 :{" "}
              <input
                value={teacher.age}
                style={{ width: 80, padding: 4, fontSize: 20 }}
              />
            </h4>
            <h4>
              性別 :{" "}
              <input
                value={teacher.sex}
                style={{ width: 100, padding: 4, fontSize: 20 }}
              />
            </h4>
          </div>
          <div className={cx("profile-title")}>
            <h4 style={{ paddingRight: 45 }}>メール</h4>
            <h4>
              :{" "}
              <input
                value={teacher.mail}
                required
                type="text"
                style={{ width: 220, padding: 4, fontSize: 20 }}
                onChange={(e) =>
                  setTeacher({ ...teacher, mail: e.target.value })
                }
              />
            </h4>
          </div>
          <div className={cx("profile-title-phone")}>
            <h4 style={{ paddingRight: 45 }}>電話番号</h4>
            <h4>
              :{" "}
              <input
                value={teacher.phone_number}
                type="text"
                onChange={(e) =>
                  setTeacher({ ...teacher, phone_number: e.target.value })
                }
                style={{ width: 160, padding: 4, fontSize: 20 }}
              />
            </h4>
          </div>
        </div>
        <div className={cx("left")}>
          <div className={cx("header-profile")}>
            <h4 className={cx("profile-info")}>個人情報</h4>
          </div>
          <p className={cx("p-profile")}>{profileTeacher.detailInfo}</p>
          <div className={cx("profile-info")}>
            <h4 className={cx("pd-r15")}>レベル</h4>
            <p>{resultLevel[0] && <> {resultLevel[0].level_name}</>}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>曜日</h4>
            <p>{resultDay[0] && <> {resultDay[0].day_name}</>}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>時間</h4>
            {/* <p>{teacher.time}</p> */}
            <p>朝</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>場所</h4>
            <p>{teacher.address}</p>
          </div>
          <div className={cx("profile-info-mt10")}>
            <h4 className={cx("pd-r35")}>料金</h4>
            <p>{teacher.tution}</p>
          </div>
          <Button variant="contained" type="submit">
            Oke
          </Button>
        </div>
      </form>
    </>
  );
}
export default ProfileSetting;
