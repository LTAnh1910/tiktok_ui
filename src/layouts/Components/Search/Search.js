import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';

import  * as searchServices  from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState(''); //nhập vạo dạng chuỗi
    const [searchResult, setSearchResult] = useState([]); // api trả về dạng mảng
    const [showResult, setShowResult] = useState(true); //mặc định show result
    const [loading, setLoading] = useState(false); //mặc định không load
    
    const inputRef = useRef(); //dùng để focus lại ô tìm kiếm
    const debounced = useDebounce(searchValue,500) ;
    
    useEffect(() => {
        if (!debounced.trim()) {
            //loại bỏ khoảng trống khi người dùng bấm cách
            setSearchResult([]);
            return;
        }

        const fetchApi = async ()=> {

            setLoading(true);
            const result = await searchServices.search(debounced)
            setSearchResult(result);
            setLoading(false);
            
        }   

        
        fetchApi()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);
    

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus(); //useRef
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if(!searchValue.startsWith(' ')){         //startsWith la bat dau voi
            setSearchValue(searchValue)
        }   

    };





    return (
       <div>
         <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result}/>
                        ))}

                        
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false} //tắt bỏ gạch đỏ dưới chân
                    onChange={handleChange} // dùng cho useRef
                    onFocus={() => {
                        setShowResult(true);
                    }} //khi bấm vào ô tìm kiếm thì show
                />

                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            handleClear();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')} onMouseDown={e =>  e.preventDefault()}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
       </div>
    );

    

}







export default Search;
