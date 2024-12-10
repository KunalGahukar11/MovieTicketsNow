import React from 'react';
import { Button, Divider } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
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
                <div className='flex justify-end pr-3'>
                    <Button type='primary' icon={<PlusCircleOutlined></PlusCircleOutlined>} className='font-semibold' onClick={open}>Add Theater</Button>
                </div>
                <Divider></Divider>
            </section>
        </>
    )
}

export default TheatreList