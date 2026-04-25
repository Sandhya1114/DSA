export default function NewButton({count, onClick}){
    
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    )

}