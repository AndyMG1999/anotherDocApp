export type Doc = {
    id:string,
    name:string,
    content:string,
    lastEdit:string,
    dateCreated:string,
    ownedBy:OwnedBy,
}
type OwnedBy = {
    userId:string,
    userName:string,
    profileImage:any,
    emailConfirmed:boolean,
}
type updateDocDto = {
    id:string,
    name:string,
    content:string
}
export const createDocument = async(title:string) => {
    const response = await fetch("http://localhost:5295/api/doc/create",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: title, content: ""}),
    });
    if(!response.ok) throw Error("Error Creating Document");
    return response.ok;
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
        body: JSON.stringify(updateDocDto),
    });
    if(!response.ok) throw Error("Error Updating Document");
    return response.ok;
}