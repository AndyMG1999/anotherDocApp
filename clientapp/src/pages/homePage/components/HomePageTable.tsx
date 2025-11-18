import { useState,useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IoMdDocument } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import 'mantine-datatable/styles.layer.css';
import { ActionIcon,Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router';

const PAGE_SIZES = [10, 20, 50];
type Props = {
    data:object[],
}

const HomePageTable = (props:Props) => {
    const data = props.data;
    const [page,setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records,setRecords] = useState(data.slice(0,pageSize));
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    
    const navigate = useNavigate();

    const columns:any = [
        {accessor: "id", title: "",render: ()=>(<IoMdDocument size={"2em"} color="#bc49ffff"/>)},
        {accessor: "name", title: "Document Name", width: '30em', sortable: true},
        {accessor: "ownedBy.userName", title: "Owned By",sortable: true},
        {accessor: "dateCreated", title: "Date Created",sortable: true},
        {accessor: "lastEdit", title: "Last Opened",sortable: true},
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