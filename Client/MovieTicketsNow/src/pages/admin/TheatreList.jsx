import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setModal } from '../../redux/slices/modalSlice';

const TheatreList = () => {
    const dispatch = useDispatch();

    const open = () => {
        dispatch(setModal('theater'));
        dispatch(openModal());
    };

    return (
        <>
            <section>
                Theater
            </section>
        </>
    )
}

export default TheatreList