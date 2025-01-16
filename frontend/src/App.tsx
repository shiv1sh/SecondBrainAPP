import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'
import { CreateContentModel } from './components/CreateContentModel'

function App() {
  const [modalOpen , setModalOpen] = useState(false);
  return (
    <div className='p-4'>
      <CreateContentModel open={modalOpen} onClose={()=>{
        setModalOpen(false)
      }}/>
      <div className={"flex gap-4 justify-end"}>
        <Button onClick = {()=>{
          setModalOpen(true);
        }}variant="primary" text="Add Content" startIcon={<PlusIcon />}></Button>
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}></Button>
      </div>
      <div className={"flex gap-4 "}>
        <Card type="twitter" link="https://x.com/kirat_tw/status/1633685473821425666" title="Harkirat's tweet" />
        <Card type="youtube" link="https://www.youtube.com/watch/gs_l8_2rN5A?si=DV_QjKcOBC0PJBzc" title="First youtube video" />
      </div>
    </div>
  )
}

export default App
