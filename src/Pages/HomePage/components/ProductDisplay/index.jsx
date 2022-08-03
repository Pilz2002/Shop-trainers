import classNames from "classnames/bind";
import {
  antem,
  laboren,
  productAntem, productLaboren, productTempora, tempora
} from "./assets/images/Title";
import { ProductDisplayItem } from "./components";
import styles from "./ProductDisplay.module.scss";

const cx = classNames.bind(styles);

function ProductDisplay() {
  const data = [
    { titleUrl: tempora, productUrl: productTempora },
    { titleUrl: antem, productUrl: productAntem },
    { titleUrl: laboren, productUrl: productLaboren },
  ];
  return (
    <div className={cx("wrapper")}>
      {data.map((item, index) => {
        const { titleUrl, productUrl } = item;
        return <ProductDisplayItem key={index} titleURL={titleUrl} productURL={productUrl} />;
      })}
    </div>
  );
}

export default ProductDisplay;
