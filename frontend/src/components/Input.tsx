export const Input = ({ reference, placeHolder }:{
    reference?:any,
    placeHolder:string
}) => {
    return (
        <div>
            <input type="text" placeholder={placeHolder} className="px-4 py-2 border rounded m-2" ref={reference}></input>
        </div>
    )
}