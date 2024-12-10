import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Col, message, Row } from 'antd';
import { Form, Modal, Select, Input, DatePicker, InputNumber, Button } from 'antd';
import { closeModal } from '../../redux/slices/modalSlice';
import { addMovie } from '../../api/movie';

const ModalCompo = () => {
    const { modalFor, isModalOpen } = useSelector((store) => store.modal);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");

    const options = [
        { label: "action", value: "action" },
        { label: "thriller", value: "thriller" },
        { label: "romance", value: "romance" },
        { label: "comedy", value: "comedy" },
        { label: "animation", value: "animation" },
        { label: "sci-fi", value: "sci-fi" },
        { label: "horror", value: "horror" },
        { label: "adventure", value: "adventure" },
    ];

    const close = () => {
        form.resetFields();
        dispatch(closeModal());
    };

    const onFinish = async (value) => {
        try {
            const data = modalFor === 'movie' ? await addMovie(value) : "";
            if (data.success) {
                console.log(data);

                message.success(data.message, 5);
                form.resetFields();
                close();
            } else {
                if (data && data.error) {
                    message.error(data.error, 5); // Show error message
                } else {
                    // Fallback for other errors
                    message.error("Failed to add the movie. Please try again.", 5);
                }
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            setErrorMsg(errorMessage); // Set error message to show in the UI
        }
    };

    const handleSubmit = () => {
        form.submit();
    };

    useEffect(() => {
        if (errorMsg) {
            message.error(errorMsg, 5);  // Show error message
            setErrorMsg(null);
        }
    }, [errorMsg]);

    return (
        <>
            <Modal title={modalFor === 'movie' ? "Add Movie" : "Add Theater"} open={isModalOpen} onCancel={close}
                footer={[
                    <Button key="cancel" onClick={close}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        {modalFor === 'movie' ? "Add Movies" : "Add Theater"}
                    </Button>,
                ]}>
                <Form layout='vertical' onFinish={onFinish} form={form}>
                    <Row>
                        <Col span={24}>
                            {
                                modalFor === 'movie' ? (
                                    <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
                                        <Input placeholder="Enter movie title"></Input>
                                    </Form.Item>
                                ) : (
                                    <Form.Item label="Theater Name" name="name" rules={[{ required: true, message: "Theater name is required" }]}>
                                        <Input placeholder="Enter theatre name"></Input>
                                    </Form.Item>
                                )
                            }</Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {
                                modalFor === 'movie' && (
                                    <Form.Item label="Poster" name="poster">
                                        <Input placeholder="Poster url"></Input>
                                    </Form.Item>
                                )
                            }
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            {
                                modalFor === 'movie' ? (
                                    <Form.Item label="Release on" name="release_date" rules={[{ required: true, message: "Release date is required" }]}>
                                        <DatePicker style={{ width: "100%" }}></DatePicker>
                                    </Form.Item>
                                ) : (
                                    <Form.Item label="No. of screens" name="screens" rules={[{ required: true, message: "Screens are required" }]}>
                                        <InputNumber min={1} max={10} style={{ width: "100%" }} ></InputNumber>
                                    </Form.Item>
                                )
                            }
                        </Col>
                        <Col span={16}>
                            {
                                modalFor === 'movie' ? (
                                    <Form.Item label="Rating" name="rating">
                                        <InputNumber min={1} max={10} placeholder='1-10' style={{ width: "100%" }}></InputNumber>
                                    </Form.Item>
                                ) : (
                                    <Form.Item label="Capacity" name="capacity" rules={[{ required: true, message: "Capacity is required" }]}>
                                        <InputNumber min={1} max={500} style={{ width: "100%" }}></InputNumber>
                                    </Form.Item>
                                )
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            {
                                modalFor === 'movie' && (
                                    <Form.Item label="Genre" name="genre" rules={[{ required: true, message: "Genre is required" }]}>
                                        <Select options={options} mode='multiple' placeholder="Enter genre"></Select>
                                    </Form.Item>
                                )
                            }
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default ModalCompo