

export default async function IdProfile({params}) {

    const {id} = await params;
    return (
        <div className="py-2 min-h-screen flex justify-center items-center">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl"> Profile page {id}</p>
        </div>
    )
}