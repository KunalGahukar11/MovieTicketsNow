import React, { useEffect, useState } from 'react'
import { Button, Divider, message, Spin, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import TheatreModal from './TheatreModal';
import { deleteTheatre, getOwnersTheatre } from '../../api/theatre';
import { useDispatch, useSelector } from 'react-redux';
import { setTheatre } from '../../redux/slices/theatreSlice';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const TheatreList = () => {
    const dispatch = useDispatch();
    const { loader } = useSelector((store) => store.loaders);
    const { user } = useSelector((store) => store.users);
    const [isTheatreModalOpen, setIsTheatreModalOpen] = useState(false);
    const [ownerTheatresData, setOwnerTheatresData] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const columns = [
        {
            title: 'Theatre Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'PinCode',
            dataIndex: 'pincode',
            key: 'pincode'
        },
        {
            title: 'Mobile No.',
            dataIndex: 'mobile_no',
            key: 'mobile_no'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Screens',
            dataIndex: 'screens',
            key: 'screens'
        },
        {
            title: 'Actions',
            render: (text, data) => {
                return <div className='inline-flex flex-col gap-2'>
                    <Button color='primary' variant='outlined' onClick={() => {
                        setIsTheatreModalOpen(true);
                        setSelectedTheatre(data);
                        setFormType("edit");
                    }}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button color='danger' variant='outlined' onClick={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedTheatre(data);
                    }}>
                        <DeleteOutlined></DeleteOutlined>
                    </Button>
                </div>
            }
        }
    ];

    const getAllTheatreOfOwner = async () => {
        try {
            dispatch(showLoader());
            const response = await getOwnersTheatre(user._id);
            if (response.success) {
                const theaterData = response.data;
                // dispatch(setTheatre(response.data));

                setOwnerTheatresData(
                    theaterData.map((theatre) => {
                        return { ...theatre, key: `theatre${theatre._id}` };
                    })
                )
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            dispatch(hideLoader());
        }
    };

    const openModal = () => {
        setFormType("add");
        setIsTheatreModalOpen(true);
        setSelectedTheatre(null);
    };

    useEffect(() => {
        getAllTheatreOfOwner();
    }, []);

    return (
        <>
            <section>
                <div className='flex justify-end pr-3'>
                    <Button type='primary' icon={<PlusCircleOutlined></PlusCircleOutlined>} className='font-semibold' onClick={openModal}>Add Theatre</Button>
                </div>
                <Divider></Divider>
                <Spin tip="Loading" size='large' spinning={loader}>
                    <Table dataSource={ownerTheatresData} columns={columns}></Table>
                </Spin>
                {isTheatreModalOpen && (
                    <TheatreModal isTheatreModalOpen={isTheatreModalOpen}
                        setIsTheatreModalOpen={setIsTheatreModalOpen}
                        getAllTheatreOfOwner={getAllTheatreOfOwner}
                        formType={formType}
                        selectedTheatre={selectedTheatre}>
                    </TheatreModal>
                )}
                {
                    isDeleteModalOpen && (
                        <DeleteModal isDeleteModalOpen={isDeleteModalOpen}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            info={"theatre"}
                            deleteKey="theatreId"
                            selectedItem={selectedTheatre}
                            setSelectedItem={setSelectedTheatre}
                            fetchData={getAllTheatreOfOwner}
                            deleteFunc={deleteTheatre}>
                        </DeleteModal>
                    )
                }
            </section>
        </>
    )
}

export default TheatreList