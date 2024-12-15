import React from 'react';
import { Modal, Button, Row, Col, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';

const DeleteModal = (props) => {
    const dispatch = useDispatch();

    const handleCancel = () => {
        props.setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            dispatch(showLoader());
            const itemId = props.selectedItem._id;
            const response = await props.deleteFunc({ [props.deleteKey]: itemId });

            if (response.success) {
                message.success(response.message);
                props.fetchData();
            } else {
                message.error(response.error);
            }
            dispatch(hideLoader());
            props.setSelectedItem(null);
            handleCancel();
        } catch (error) {
            dispatch(hideLoader());
            message.error(error.error);
            handleCancel();
        }
    };

    return (
        <>
            <Modal centered open={props.isDeleteModalOpen} onCancel={handleCancel} footer={null}>
                <div className='flex justify-start items-center gap-4 mb-6'>
                    <ExclamationCircleFilled className='text-yellow-400 text-3xl'></ExclamationCircleFilled>
                    <h3 className='text-xl font-semibold'>Are you sure to delete this {props.info}?</h3>
                </div>
                <p className="pb-3 ml-8">
                    This action can't be undone and you'll lose this {props.info} data.
                </p>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='m-5 mb-0 justify-end'>
                    <Col span={4}>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Col>
                    <Col span={5}>
                        <Button color='danger' variant='solid' onClick={handleDelete}>Delete</Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default DeleteModal