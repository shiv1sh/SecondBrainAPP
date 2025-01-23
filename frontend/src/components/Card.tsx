import { ShareIcon } from "../icons/ShareIcon"
interface CardProps {
    title: string,
    type: string,
    link: string
}
export const Card = ({ type, title, link }: CardProps) => {
    return (
        <div className={"p-4 bg-white rounded border-gray-200 w-80 border max-w-xl min-w-24"}>
            <div className={"flex justify-between"}>
                <div className={"flex gap-3 text-gray-500 text-md items-center"}>
                    {/* <ShareIcon /> */}
                    {title}
                </div>
                <div className={"flex gap-3 text-gray-500 items-center"}>
                    <a href={link} target="_blank">
                        <ShareIcon />
                    </a>
                </div>
            </div>
            <div className={"pt-4"}>
                <div className={"font-medium"}>
                </div>
                {type === "youtube" &&
                    <iframe className={"w-full"} src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
                {type === "twitter" &&
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com","twitter.com")}></a>
                    </blockquote>
                }
            </div>
        </div>
    )
}