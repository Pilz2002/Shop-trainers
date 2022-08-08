import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./PaginationContent.module.scss";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "@/Pages/MenPage/MenPageSlice";
import { selectOptionSort } from "@/Pages/MenPage/MenPageSlice";

const cx = classNames.bind(styles);

function PaginationContent({ itemsPerPage, children }) {
  const dispatch = useDispatch()
  const optionSort = useSelector(selectOptionSort)
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let data = children.slice(itemOffset, endOffset)
    for(let i = 0; i < data.length - 1; i++) {
      for(let j = i + 1; j < data.length; j++) {
        if(optionSort > 0) {
          if(data[i].props.price > data[j].props.price) {
            let temp = data[i]
            data[i] = data[j]
            data[j] = temp
          }
        }
        else if(optionSort < 0) {
          if(data[i].props.price < data[j].props.price) {
            let temp = data[i]
            data[i] = data[j]
            data[j] = temp
          }
        }
      }
    }
    
    setCurrentItems(data);
    setPageCount(Math.ceil(children.length / itemsPerPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, optionSort]);

  const handlePageClick = (event, page) => {
    dispatch(changePage(page))
    const newOffset = ((page - 1) * itemsPerPage) % children.length;
    setItemOffset(newOffset);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {currentItems.map((product, index) => {
          return (
            <div className={cx("product")} key={index}>
              {product}
            </div>
          );
        })}
      </div>
      <Pagination
        count={pageCount}
        color="error"
        onChange={handlePageClick}
        className={cx("pagination")}
      />
    </div>
  );
}

export default PaginationContent;
