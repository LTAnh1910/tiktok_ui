import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function AccountItem(data) {

    const result = data.data   //fake api json thi dung result 
    return (
        <Link to={`/@${result.name}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={result.avatar} alt={result.name} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{result.username}</span>
                    {/* toán tử && dùng để check  */}
                    {result.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{result.name}</span>
            </div>
        </Link>
    ); 
    
}


export default AccountItem;
