import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SideBar } from "../components";
import { Content } from "./components";
import styles from "./MenPage.module.scss";

const cx = classNames.bind(styles);

function MenPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("https://shop-trainer-backend.herokuapp.com/product/adult").then((response) => {
      setData(response.data)
    })
  }, [])
  const sidebarData = [
    {
      title: "SẢN PHẨM",
      content: data.slice(0, 3).map((item, index) => {
        return { url: item.thumbnail, title: item.name, price: 1200000 }
      }),
    },
    {
      title: "BÀI VIẾT MỚI NHẤT",
      content: data.slice(0, 3).map((item, index) => {
        return { url: item.thumbnail, title: item.name }
      }),
    }
  ];
  const contentData = data.map((item, index) => {
    return {
      url: item.thumbnail,
      name: item.name,
      price: item.price,
      productId: item._id
    }
  })

  return (
    <div className={cx("wrapper")}>
      <SideBar sidebarItems={sidebarData} />
      {data.length !== 0 && <Content contentItems={contentData} />}
    </div>
  );
}

export default MenPage;
