import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
       <div className = {cx('wrapper')}>
            <img className={cx('avatar')} 
                    src = "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/dc3494dd75e8446964e5d8b6c656e586~c5_100x100.jpeg?x-expires=1680854400&x-signature=J4O31XkzDDqWtj0AgMyzt0x0dsI%3D" alt= "Hang"/>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Ho va ten </span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>HHH</span>
            </div>
       </div>
    );
}

export default AccountItem;