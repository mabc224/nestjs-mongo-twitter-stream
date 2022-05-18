import React, { useEffect, useState, useMemo } from 'react'
import ReactBubbleChart from 'react-bubble-chart'
import useSound from 'use-sound'
import { getTweets } from '../../api/tweet'
import Table from './../../components/common/table'
import '../../../node_modules/react-bubble-chart/src/style.css'
import mainSound1 from '../../assets/sounds/c001.ogg'
import mainSound4 from '../../assets/sounds/c004.ogg'
import mainSound10 from '../../assets/sounds/c010.ogg'
import mainSound12 from '../../assets/sounds/c012.ogg'
import mainSound13 from '../../assets/sounds/c013.ogg'
import { useSocket } from './../../hooks/useSocket.hook'

const colorLegend = [
 //reds from dark to light
 {
  color: '#67000d',
  text: 'Negative',
  textColor: '#ffffff'
 }, '#a50f15', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272', '#fcbba1', '#fee0d2',
 //neutral grey
 {color: '#f0f0f0', text: 'Neutral'},
 // blues from light to dark
 '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', {
  color: '#08306b',
  text: 'Positive',
  textColor: '#ffffff'
 }
]

const tooltipProps = [
 {
  css: 'symbol',
  prop: '_id'
 }, {
  css: 'value',
  prop: 'value',
  display: 'Value'
 }, {
  css: 'change',
  prop: 'text',
  display: 'Text'
 }]

const sounds = [mainSound1, mainSound4, mainSound10, mainSound12, mainSound13]

const TweetListPage = () => {

 const [socket] = useSocket()
 const [tweets, setTweets] = useState([])
 const [rows, setRows] = useState([])
 const [play, { stop }] = useSound(mainSound1)//sounds[Math.floor(Math.random() * sounds.length)]);

 const [page, setPage] = useState(1)
 const [perPage, setPerPage] = useState(50)
 const [total, setTotal] = useState(0)
 const [pageCount, setPageCount] = useState(0)

 async function fetchTweets (opts) {
  let response = await getTweets(opts)

  const result = response.data.tweets.map(d => ({
   _id: d.tweetId,
   value: d.tweetLength,
   displayText: d.tweetLength,
   colorValue: d.tweetLength, // used to determine color
   selected: false,
   text: d.data
  }))

  setRows(result)
  setPage(response.data.page - 1)
  setPerPage(response.data.perPage)
  setTotal(response.data.totalCount)
  setPageCount(Math.ceil(response.data.totalCount/response.data.perPage))
 }

 useEffect(() => {
  fetchTweets()
 }, [])

 useEffect(() => {
  socket.on('new-tweet', (data) => {
   // sound.fade(0, 1, 1000);
    setTweets((prev = []) => {
     return [...prev.slice(-15), data]
    })
  })
 }, [])

 const tooltipFunc = () => {
  play()
 }

 const columns = useMemo(() => [
  {
   Header: 'TweetId',
   accessor: '_id',
  },
  {
   Header: 'Tweet Length',
   accessor: 'value',
  },
  {
   Header: 'Data',
   accessor: 'text',
  },
 ], [])

 return (
  <div className=" flex flex-col">
   <div className="">
    <ReactBubbleChart
     className="h-screen"
     colorLegend={colorLegend}
     data={tweets}
     selectedColor="#737373"
     selectedTextColor="#d9d9d9"
     fontSizeFactor={0.5}
     fixedDomain={{min: 0, max: 160}}
     legend={false}
     legendSpacing={0}
     tooltip={true}
     tooltipProps={tooltipProps}
     tooltipFunc={tooltipFunc}
    />
   </div>
   <div className="mt-6">
    <Table columns={columns} data={rows} fetchData={fetchTweets} pageCount={pageCount}/>
   </div>
  </div>
 )
}

export default TweetListPage
