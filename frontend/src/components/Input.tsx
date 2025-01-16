export const Input = ({ onChange, placeHolder }) => {
    return (
        <div>
            <input type="text" placeholder={placeHolder} className="px-4 py-2 border rounded m-2" onChange={onChange}></input>
        </div>
    )
}