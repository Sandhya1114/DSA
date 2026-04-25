const user={
    name: "Jessica",
    imgUrl: "https://i.imgur.com/yXOvdOSs.jpg",
    imgSize: 90
};
export default function Profile(){
    return (
        <>
            <h1>{user.name}</h1>
            <img 
                src={user.imgUrl} 
                alt={"Photo of " + user.name} 
                style= {{
                    width: user.imgSize,
                    height: user.imgSize
                }}
                />
        </>
    )
}