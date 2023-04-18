import PropTypes from 'prop-types';

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
        <Link to={`/@${result.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={result.avatar} alt={result.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{result.nickname}</span>
                    {/* toán tử && dùng để check  */}
                    {result.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{result.full_name}</span>
            </div>
        </Link>
    ); 
    
}

AccountItem.propTypes = {
    data : PropTypes.object.isRequired
}

export default AccountItem;