import classNames from "classnames/bind";
import {Link} from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles)


function Button({ 
    to, 
    href,
    children,
    disable = false,
    primary = false, 
    outline = false,
    small = false,
    large = false ,
    text = false,
    rounded=false,
    leftIcon,
    rightIcon,
    className,
    onClick,
     ...passProps 
}) { /// ...passProps lay cac thuoc tinh trong button 
    let Comp = 'button';
    const  props = {
        onClick,

        ...passProps,
    };

    //remove event listeners

    if(disable) {
       Object.keys(props).forEach(key =>{
            if(key.startsWith("on") && props[key]==="function"){
                delete props[key];
            }
       })
    } 

    if(to){
        props.to = to
        Comp = Link

    }else if(href){
        props.href = href;
        Comp = 'a'
    }

    const classes = cx('wrapper',{
        primary, //add class primary in classes ES6 css
        outline,
        small,
        large,
        text,
        rounded,
        disable,
        [className]:className, //khi co classname thi lay gia tri classname lam key
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
      );
}

export default Button;