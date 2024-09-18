import { useEffect, useRef } from 'react'
import './App.css'

// schemas
import {getLeadingKeys} from './schemas/lotrapi'

interface LeadingKey {
  key: string
}

function App() {

  const startingUrl = "https://lotrapi.co/api/v1/characters"
  const endpointCollection = useRef<string[]>([])

  const targetKey = 'id'
  const leadingKeys = useRef<LeadingKey[]>([])

  // const getData = async (url: string) => {
  //   try {
  //     const response = await fetch(url)
  //     const data = await response.json()
      
  //     console.log(Schema.safeParse(data).data)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const followEndpoint = async (url: string) => {
    const response = await fetch(url)
    const data = await response.json()

    // get All id's which counts as the leading Key
    const validation = getLeadingKeys(targetKey, data)

    // check if this was succesful
    if (validation.success) {
      validation.data.results.forEach(res => {

        const leadingKey = {
          key: res.id.toString()
        }
        
        // Save the keys
        leadingKeys.current.push(leadingKey)
      })
    } else {
      console.log("we got new url", url)
      endpointCollection.current.push(url)
      return
    }
    
    // // Loop through all the keys
    leadingKeys.current.forEach(item => {
      // And check the new endpoint
      const newUrl = `${url}/${item.key}`
      followEndpoint(newUrl)
    })
  }

  useEffect(() => {
    if (leadingKeys.current.length !== 0) return;
    followEndpoint(startingUrl)
  }, [])

  const rerender = () => {
    console.log(endpointCollection.current)
    console.log(leadingKeys.current)
  }

  return (
    <main>
      <button onClick={rerender}>
        Show
      </button>
      <pre>
        <code>
        </code>
      </pre>
    </main>
  )
}

export default App
