import React,{useState} from 'react'

const FandQ = () => {
   // State to manage which FAQ is open
 const [openFaq, setOpenFaq] = useState(null);

 const toggleFaq = (index) => {
   setOpenFaq(openFaq === index ? null : index); 
 };

  return (
    <div className="faq-container">
        <h1 className="faq-header"
        >Frequently Asked Questions</h1>
        <div className="faq-item">
          <p className="faq-question" onClick={() => toggleFaq(0)}
            >
            What is crowdfunding? <span>{openFaq === 0 ? '-' : '+'}</span>
          </p>
          {openFaq === 0 && (
            <div className="faq-answer"
            >
              Crowdfunding is a way of raising funds for a project, cause, or
              individual by collecting small amounts of money from a large number
              of people.
            </div>
          )}
        </div>
        <div className="faq-item">
        <p className="faq-question" onClick={() => toggleFaq(1)}
        
          
            transition={{duration:0.5,delay:0.4}}
            >
            Is crowdfunding legal in India? <span>{openFaq === 1 ? '-' : '+'}</span>
          </p>
          {openFaq === 1 && (
            <div className="faq-answer">
              Yes, crowdfunding is legal in India, provided it adheres to government
              regulations and policies.
            </div>
          )}
        </div>
        <div className="faq-item">
        <p className="faq-question" onClick={() => toggleFaq(2)}
        
          
            transition={{duration:0.5,delay:0.6}}
            >
            How much does it cost to raise funds on Bhayat Foundation?{' '}
            <span>{openFaq === 2 ? '-' : '+'}</span>
          </p>
          {openFaq === 2 && (
            <div className="faq-answer">
              The cost varies depending on the platform fees and payment gateway
              charges. Contact Bhayat Foundation for detailed pricing.
            </div>
          )}
        </div>
      </div>

  )
}

export default FandQ