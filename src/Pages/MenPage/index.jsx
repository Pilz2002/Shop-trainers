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
    axios.get("https://shop-trainers-api.herokuapp.com/data").then((response) => {
      setData([...response.data.product.classic, ...response.data.product.chuck07s])
    })
  }, [])
  const sidebarData = [
    {
      title: "SẢN PHẨM",
      content: data.slice(0, 3).map((item, index) => {
        return { url: item.url, title: "Chuck Taylor Classic", price: 1200000 }
      }),
    },
    {
      title: "BÀI VIẾT MỚI NHẤT",
      content: data.slice(0, 3).map((item, index) => {
        return { url: item.url, title: "Chuck Taylor Classic" }
      }),
    }
  ];
  const contentData = data.map((item, index) => {
    return {
      url: item.url,
      name: "Chuck Taylor Classic",
      price: 100000 * index
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
