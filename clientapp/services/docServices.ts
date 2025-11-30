import { HubConnectionBuilder } from '@microsoft/signalr';

export type Doc = {
    id:string,
    name:string,
    content:string,
    lastEdit:string,
    dateCreated:string,
    ownedBy:ownedBy,
}
type ownedBy = {
    userId:string,
    userName:string,
    profileImage:any,
    emailConfirmed:boolean,
}
export type caretPositionDto = {
    userName:string,
    caretPosition:number,
}
export type updateDocDto = {
    id:string,
    name:string,
    content:string,
    caretPositionDto:caretPositionDto
}

export type updateDocTitleDto = {
    id:string,
    name:string,
}

export const createDocument = async(title:string) => {
    const response = await fetch("http://localhost:5295/api/doc/create",{
        method: "POST",
        credentials: "include",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: title, content: ""}),
    });
    if(!response.ok) throw Error("Error Creating Document");
    const data:string = await response.json();
    return data;
}

export const getAllDocuments = async() => {
    const response = await fetch("http://localhost:5295/api/doc/getAll");
    if(!response.ok) throw Error("Error Getting All Documents");
    const data:Doc[] = await response.json();
    console.log("docs data:",data);
    return data;
}

export const getDocument = async(id:string) => {
    const response = await fetch("http://localhost:5295/api/doc/get/"+id);
    if(!response.ok) throw Error("Error Getting Document "+id);
    const data:Doc = await response.json();
    return data;
}

export const updateDocument = async(updateDocDto:updateDocDto) => {
    const response = await fetch("http://localhost:5295/api/doc/update",{
        method: "PUT",
        headers:{ 'Content-Type': 'application/json', },
        credentials: "include",
        body: JSON.stringify(updateDocDto),
    });
    if(!response.ok) throw Error("Error Updating Document");
    return response.ok;
}
export const updateDocumentTitle = async(updateDocTitleDto:updateDocTitleDto) => {
    const response = await fetch("http://localhost:5295/api/doc/updateTitle",{
        method: "PUT",
        headers:{ 'Content-Type': 'application/json', },
        credentials: "include",
        body: JSON.stringify(updateDocTitleDto),
    });
    if(!response.ok) throw Error("Error Updating Document");
    return response.ok;
}

export const testAuth = async () => {
    const response = await fetch("http://localhost:5295/weatherforecast",{credentials: "include",});
    if(!response.ok) throw Error();
    const data = await response.json();
    console.log("Data!! ",data);
}

export const docConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5295/docHub') // Replace with your server URL and Hub path
        .build();

docConnection.start()
.then(() => console.log('SignalR Connected!'))
.catch(err => console.error('SignalR Connection Error: ', err));
