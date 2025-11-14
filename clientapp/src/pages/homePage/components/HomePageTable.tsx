import { useState,useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IoMdDocument } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import 'mantine-datatable/styles.layer.css';
import { ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router';

const PAGE_SIZES = [5, 10, 20];

const HomePageTable = () => {
    const data = [{ id: 1, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 2, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 3, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 4, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 5, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 6, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"},{ id: 7, name: "Name2", dateCreated: "12/1/2023", lastEdit: "11/14/2025"}];
    const [page,setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [records,setRecords] = useState(data.slice(0,pageSize));
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const navigate = useNavigate();

    const columns:any = [
        {accessor: "id", title: "",render: ()=>(<IoMdDocument size={"2em"} color="#bc49ffff"/>)},
        {accessor: "name", title: "Document Name", width: '30em'},
        {accessor: "ownedBy", title: "Owned By"},
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
    }, [page, pageSize]);

    return(
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
        onRowClick={({ record, index }) => {
            navigate(`/doc/${record.id}`);
        }}
        />
    )
}

export default HomePageTable;