import className from 'classnames/bind'
import styles from './MenuItem.module.scss'

const cx = className.bind(styles)

function MenuItem({ children, path='', onClick= () => {} }) {
  return ( 
    <div onClick={onClick} className={cx('menu-item')} >
      { children }
    </div>
  );
}

export default MenuItem;