import React, { useEffect, useState } from 'react';
import { Button, Divider, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { openModal, setModal } from '../../redux/slices/modalSlice';
import { getAllMovies } from '../../api/movie';

const MoviesList = () => {
    const dispatch = useDispatch();
    const [moviesData, setMoviesData] = useState([]);

    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (text, data) => {
                return (
                    <img
                        src={data.poster}
                        height="115"
                        width="75"
                        style={{ objectFit: "cover" }}
                    />
                );
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Release On',
            dataIndex: 'release_date',
            key: 'release_date',
            render: (text, data) => {
                const releaseDate = new Date(text);
                const day = releaseDate.getDate().toString().padStart(2, '0');
                const month = (releaseDate.getMonth() + 1).toString().padStart(2, '0');
                const year = releaseDate.getFullYear();

                return `${day}/${month}/${year}`;
            }
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            render: (text, data) => {
                return text.join(', ');
            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Actions',
            render: (text, data) => {
                return (
                    <div>
                        <Button>
                            <EditOutlined />
                        </Button>
                        <Button>
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const open = () => {
        dispatch(setModal('movie'));
        dispatch(openModal());
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getAllMovies(); // Assuming getAllMovies is async
            setMoviesData(data); // Set the fetched data in the state
        };

        fetchMovies();
    }, []);

    return (
        <>
            <section>
                <div className='flex justify-end pr-3'>
                    <Button type='primary' icon={<PlusCircleOutlined></PlusCircleOutlined>} className='font-semibold' onClick={open}>Add Movie</Button>
                </div>
                <Divider></Divider>
                <Table dataSource={moviesData} columns={columns}></Table>
            </section>
        </>
    )
}

export default MoviesList