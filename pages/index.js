//import styles from '../styles/Home.module.css'
import Card from './components/3dcard'
import {useEffect} from 'react'
import gsap from 'gsap/dist/gsap'

export default function Home() {

    useEffect(()=>{
        gsap.fromTo('#title',{x:'-150%'}, {x:0, duration:1, ease:'elastic.out', delay:1})
    },[])

  return (
    <div>
      <header>
          <h1 id={"title"}>Présentation de nos nouvelles cartes</h1>
      </header>
      <Card cardId={"test"} cardName={"Lord Jaraxxus"}></Card>
      <Card cardId={"test1"} cardName={"Drol Succaraj"}></Card>
    </div>
  )
}
