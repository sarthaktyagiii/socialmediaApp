import React from "react";
import {Pagination,PaginationItem} from '@material-ui/lab';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import {getPosts} from '../actions/posts';


const Paginate = ({page}) => {
    const classes=useStyles();
    const {numberofPages}= useSelector((state) =>state.posts);
    const dispatch=useDispatch();
    useEffect(()=>  {
        if(page){
            dispatch(getPosts(page));
        }
    },[page,dispatch]);
    return (
        <Pagination
            classes={{ul:classes.ul}}
            count={numberofPages}
            page={Number(page)||1}
            variant='outlined'
            color="primary"
            renderItem  ={(item)=>(
                    <PaginationItem
                        {...item}
                        component={Link}
                        to={`/posts?page=${item.page}`}
                    />
    )}  
        />
    );
};


export default Paginate;

 
