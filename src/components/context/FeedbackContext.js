import { createContext, useState, useEffect } from "react";
// import { v4 as uuidv4 } from 'uuid';


const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const[isLoading, setIsLoading] = useState(true)
  const[feedback,setFeedback]  = useState([]);
  const[feedbackEdit,setFeedbackEdit]  = useState(
    {
      item: {},
      edit: false
    },
  );

  //Fetch feedback
  const fetchFeedback = async () => {
      const response = await fetch('/feedback?_sort=id&_order=desc')
      const data = await response.json()
      
      setFeedback(data)
      setIsLoading()
  }

  useEffect(() => {
    fetchFeedback(); 
  }, []) 

  //Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, 
      ...updItem } : item) )
    )
  }

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //Delete feedback
	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure want to delete this item?")) {
			setFeedback(feedback.filter((item) =>item.id !== id ))
		}
	}

  //Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    console.log(response.body);
    const data = await response.json()

		setFeedback([data, ...feedback])
	}
  
  return (
    <FeedbackContext.Provider 
      value ={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext