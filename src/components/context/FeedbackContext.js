import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const[feedback,setFeedback]  = useState([
    {
      id:1,
      text: 'This is item 1 is from context',
      rating: 10
    },
    {
      id:2,
      text: 'This is item 2 is from context',
      rating: 5
    },
    {
      id:3,
      text: 'This is item is 3 from context',
      rating: 10
    },
  ]);

  const[feedbackEdit,setFeedbackEdit]  = useState(
    {
      item: {},
      edit: false
    },
  );

  //Update feedback

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
  const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}
  
  return (
    <FeedbackContext.Provider 
      value ={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext