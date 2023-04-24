
import PropTypes from 'prop-types' 
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import { useState } from 'react';


const cx = classNames.bind(styles);

const defaultFn = ()=>{

}

function Menu({children, items = [], onChange= defaultFn, hideOnClick = false}) {

    const [history,setHistory] = useState([{ data : items }]);
    
    const current = history[history.length - 1];

    const renderItems = ()=>{
        return current.data.map((item,index)=>{
           
           const isParent = !!item.children; // !! la check kieu boolean

            return (
                <MenuItem 
                key = {index} 
                data = {item} 
                onClick={()=>{
                    if(isParent) {
                        setHistory(prev => [...prev, item.children]);
                    }else{
                        onChange(item)
                    }
                }}/>
            )
        })
    }

    const handleBack = ()=>{
        setHistory(prev => prev.slice(0, prev.length - 1))
       }

    const renderResult = (attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
            {/* header menu */}
               { history.length > 1 && <Header title="Languages" onBack={handleBack}/>}
            {/* content menu */}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
)
 //reset to first menu
    const handleResetMenu = () => {
        setHistory(prev => prev.slice(0, 1))
    }
    return (
        <Tippy
            interactive
            hideOnClick = {hideOnClick}
            delay={[0, 700]}
            placement= 'bottom-end'
            offset={[8,12]}
            render={renderResult}
            //reset lai trang dau tien
            onHide={handleResetMenu}
            >
            {children}
        </Tippy>  );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
}

export default Menu;