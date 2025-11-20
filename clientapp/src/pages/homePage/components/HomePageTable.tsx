import { useState,useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IoMdDocument } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import 'mantine-datatable/styles.layer.css';
import { ActionIcon,Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router';
import type { Doc } from '../../../../services/docServices';

const PAGE_SIZES = [10, 20, 50];
type Props = {
    data:Doc[],
    selectedRecords:any,
    setSelectedRecords:any,
}

const HomePageTable = (props:Props) => {
    const data = props.data;
    const selectedRecords = props.selectedRecords;
    const setSelectedRecords = props.setSelectedRecords;
    const [page,setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records,setRecords] = useState(data.slice(0,pageSize));
    
    const navigate = useNavigate();

    const columns:any = [
        {accessor: "id", title: "",render: ()=>(<IoMdDocument size={"2em"} color="#bc49ffff"/>)},
        {accessor: "name", title: "Document Name", width: '30em'},
        {accessor: "ownedBy.userName", title: "Owned By"},
        {accessor: "dateCreated", title: "Date Created"},
        {accessor: "lastEdit", title: "Last Opened"},
        {accessor: "", render: ()=>(<ActionIcon variant="subtle"><HiOutlineDotsVertical/></ActionIcon>)},
    ]

    useEffect(() => {
    setPage(1);
    }, [pageSize]);

    useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
    }, [data,page, pageSize]);

    return(
    <Skeleton visible={data.length<1} w={"80%"}>
    <DataTable 
    highlightOnHover={true}
    columns={columns} 
    records={records} 
    totalRecords={data.length} 
    page={page} 
    onPageChange={(p)=>setPage(p)} 
    recordsPerPage={pageSize} 
    recordsPerPageOptions={PAGE_SIZES} 
    onRecordsPerPageChange={setPageSize}
    selectedRecords={selectedRecords}
    onSelectedRecordsChange={setSelectedRecords}
    shadow="md"
    withTableBorder
    borderRadius="lg"
    onRowClick={({ record }) => {
        navigate(`/doc/${record.id}`);
    }}
    />
    </Skeleton>
    )
}

export default HomePageTable;