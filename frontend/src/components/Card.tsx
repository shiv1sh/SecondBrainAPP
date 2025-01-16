import { ShareIcon } from "../icons/ShareIcon"

export const Chat = () => {
    return (
        <div className={"p-4 bg-white rounded border-gray-200 max-w-96 border max-w-72"}>
            <div className={"flex justify-between"}>
                <div className={"flex gap-3 text-gray-500 text-md items-center"}>
                    <ShareIcon />
                    Project Ideas
                </div>
                <div className={"flex gap-3 text-gray-500 items-center"}>
                    <ShareIcon />
                    <ShareIcon />
                </div>
            </div>
            <div className={"pt-4"}>
                {/* <iframe className={"w-full"}  src="https://www.youtube.com/embed/HBgFvEIw12A?si=gP-d6TnP5aro3gtx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
                <blockquote className="twitter-tweet">
                    <a href="https://twitter.com/username/status/807811447862468608"></a>
                </blockquote>
            </div>
        </div>
    )
}