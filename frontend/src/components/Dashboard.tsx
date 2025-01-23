import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { SideBar } from '../components/SideBar'
import { useContent } from './hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
      <SideBar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        {/* {JSON.stringify(contents)} */}
        <CreateContentModel open={modalOpen} onClose={() => {
          setModalOpen(false)
        }} />
        <div className={"flex gap-4 justify-end"}>
          <Button onClick={() => {
            setModalOpen(true);
          }} variant="primary" text="Add Content" startIcon={<PlusIcon />}></Button>
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}></Button>
        </div>
        <div className={"flex gap-4 pt-4"}>
          <Card type="twitter" link="https://x.com/kirat_tw/status/1633685473821425666" title="Harkirat's tweet" />
          <Card type="youtube" link="https://www.youtube.com/watch/gs_l8_2rN5A?si=DV_QjKcOBC0PJBzc" title="Last College vlog"/>
          <Card type="youtube" link="https://www.youtube.com/embed/vI-mCZDdG6M?si=yozS4zfa-7VocLlX" title="Shimla vlog"/>
          {contents.map(({ type, link, title, _id }) => {
            //console.log({ type, link, title, _id });
            return <Card type={type} link={link} title={title}/>;
          })}
        </div>
      </div>
    </div>
  )
}
