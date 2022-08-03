import classNames from "classnames/bind";
import { Product } from "@/Pages/components";
import { Header, PaginationContent } from "./components";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

function Content({ contentItems }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <PaginationContent itemsPerPage={8}>
      { contentItems.map((item, index) => {
        return <Product url={item.url} name={item.name} price={item.price} key={index} productId={item.productId} />
      }) }
      </PaginationContent>
    </div>
  );
}

export default Content;
