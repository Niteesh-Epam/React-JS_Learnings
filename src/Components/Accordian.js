import React, { useState } from "react";
import { FixedSizeList } from "react-window";

const Accordion = ({ isOpen, toggleAccordion, children }) => (
  <div
    className={`accordion ${isOpen ? "open" : ""}`}
    onClick={toggleAccordion}>
    {children}
  </div>
);

const PhoneBook = () => {
  const [openIndex, setOpenIndex] = useState([]);

  const handleToggle = (index) => {
    setOpenIndex((prev) => {
      const isOpen = prev.includes(index);
      return isOpen ? prev.filter((item) => item !== index) : [...prev, index];
    });
  };

  const renderAccordion = ({ index, style }) => (
    <div style={style}>
      <Accordion
        isOpen={openIndex.includes(index)}
        toggleAccordion={() => handleToggle(index)}>
        <div className='accordion-header'>
          <div>Phone number {index + 1}</div>
          <button>{openIndex.includes(index) ? "-" : "+"}</button>
        </div>
        {openIndex.includes(index) && (
          <div className='accordion-content'>
            <span className='phone-number'>732- {index + 1}</span>
            <span className='email'>{index + 1}@gmail.com</span>
          </div>
        )}
      </Accordion>
    </div>
  );

  return (
    <div className='phone-book'>
      <FixedSizeList
        height={500}
        width={500}
        itemSize={80}
        itemCount={900}
        className='list'>
        {renderAccordion}
      </FixedSizeList>
    </div>
  );
};

export default PhoneBook;
