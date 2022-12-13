import React, { Fragment, useEffect } from 'react'
import {useNavigate} from "react-router-dom";
import { tokenGetter } from '../utils/tokenIdGetter';
export default function NewPost() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!tokenGetter()) {
            navigate("/");
        }
    }, [navigate])
    return (
        <Fragment>
            
        </Fragment>
    )
}
