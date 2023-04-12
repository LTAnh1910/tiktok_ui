import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark,faSpinner, faEllipsisVertical, faEarthAsia, faCircleQuestion, faKeyboard, faUser, faCoins, faSignIn, faGear} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';

import styles from './Header.module.scss';
import images  from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, SearchIcon, UploadIcon } from '../../../Icons';
import Image from '~/components/Image';


const cx = classNames.bind(styles);
const currentUser = true;


const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}/>,
        title : "English",
        children: {
            title : "Language",
            data: [
                {
                    type: "language",
                    code: "en",
                    title: "English"
                },
                {
                    type: "language",
                    code: "vi",
                    title: "Tiếng Việt"
                }
            ]
        }

    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title : "Feedback and Help",
        to: "/feedback"
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title : "Keyboard shortcuts",
    }
];

function Header() {

    const [searchResult,setSearchResult] = useState([]);

    useEffect(()=>{
            setTimeout(()=>{
                setSearchResult([]);
            }, 0)
    },[])

    //handle logic
    const handleMenuOnchange = (menuItem)=>{
        switch(menuItem.type) {
            case 'language':

            break;
        default:    
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title : "View profile",
            to: "@anhhh"
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}/>,
            title : "Get coins",
            to: "/coins"
        },
        {
            icon: <FontAwesomeIcon icon={faGear}/>,
            title : "Settings",
            to: "/settings"
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignIn}/>,
            title : "Log out",
            to: "/logout",
            separate: true,
        },
    ]
    return (<header className = {cx('wrapper')}>
        <div className={cx('inner')}>
          
            <img src = {images.logo} alt="tiktok" />  
            <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={attrs => (
                            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className ={cx('search-title')}>
                                        Accounts
                                    </h4>
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper>
                            </div>
                    )}
                    >
                <div className={cx('search')}>
                    <input placeholder = "Search accounts and videos" spellCheck ={false}></input>
                        
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>


                
                        <button className= {cx('search-btn')}>
                            <SearchIcon/>
        
                        </button>
                
                </div>
            </HeadlessTippy>

            <div className={cx('actions')}>
            {currentUser ? (
                <>
                <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                </>
            ) : (

                    <>
                        <Button text> Upload </Button>
                        <Button primary> Log in </Button>
                       
                    </>
            )}
                    <Menu
                            items = {currentUser ? userMenu : MENU_ITEMS}
                            onChange={handleMenuOnchange}>
                            {currentUser ? (
                                <Image src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/dc3494dd75e8446964e5d8b6c656e586~c5_100x100.jpeg?x-expires=1680854400&x-signature=J4O31XkzDDqWtj0AgMyzt0x0dsI%3D"  
                                className={cx('user-avatar') } 
                                alt="nguyen van a " 
                                fallback='https://instagram.fsgn2-7.fna.fbcdn.net/v/t51.2885-19/332559565_2108717502649880_4927950974683695168_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsgn2-7.fna.fbcdn.net&_nc_cat=108&_nc_ohc=rr9FOgunbYsAX90g1s2&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfDpiZ9KZveY649zupzVP73uzg_qmyfhcr3YYtLTFcCI0w&oe=64394BBB&_nc_sid=1527a3'
                                />
                            ) : (

                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon = {faEllipsisVertical}/>
                            </button>
                            ) }
                    </Menu>    
            </div>
        </div>
    </header>
    )
}

export default Header