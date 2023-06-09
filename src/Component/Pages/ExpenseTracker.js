import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container,Form } from "react-bootstrap";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import Expense from "./Expense";
import { expenseActions, premiumActions, PremiumActions } from "../store";
import CsvDownloadButton from "./CsvDownloadButton";

const ExpenseTracker = ()=>{


  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expense.expenses);
  const isPremium = useSelector(state => state.premium.isPremium);
  const showButton = useSelector(state=>state.premium.showButton)
  const changeTheme = useSelector(state=>state.premium.theme)

function changeShowButton(){
  dispatch(premiumActions.showBuyButton(false))
  
}
  
function toggleTheme(event){

event.preventDefault()
dispatch(premiumActions.changeTheme())
}


  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  function editExpense(data) {
    amountRef.current.value = data.amount;
    descriptionRef.current.value = data.description;
    categoryRef.current.value = data.category;
  }

  async function saveExpense(event) {
    event.preventDefault();
    try {
      const obj = {
        "amount": amountRef.current.value,
        "description": descriptionRef.current.value,
        "category": categoryRef.current.value
      };
      const head = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(`${process.env.REACT_APP_FireBaseDataBase}expenses.json`, obj, head);
      const id = res.data.name;
      const savedata = { [id]: obj };
      if (res.status === 200) {
        amountRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';
        getExpenses();
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  async function getExpenses() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_FireBaseDataBase}expenses.json`);
      if (res.status === 200) {
        dispatch(expenseActions.addExpense(res.data));
        let sum = 0;
        Object.keys(res.data).map((key) => (sum += Number(res.data[key].amount)));
        if (sum > 10000) {
          dispatch(premiumActions.setIsPremium(true));
        } else {
          dispatch(premiumActions.setIsPremium(false));
        }
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }
return (
    <React.Fragment>
<Container className='m-2'>
    <Form>
     <MDBInput wrapperClass='mb-4' label='amount' id='amount' type='number' ref={amountRef}/>
          <MDBInput wrapperClass='mb-4' label='description' id='description' type='description' ref={descriptionRef}/>
          <Form.Select aria-label="Default select example" ref={categoryRef}>
      <option>Select the Type of Expense</option>
      <option value="Food">Food</option>
      <option value="Fuel">Fuel</option>
      <option value="Salary">Movie</option>
    </Form.Select>
          <MDBBtn onClick={saveExpense}>Add Expense</MDBBtn>
          { isPremium &&  showButton && <MDBBtn className='m-2' onClick={changeShowButton}>Buy Premium</MDBBtn>}
          {showButton ==false && <MDBBtn className='m-2' onClick={toggleTheme}>Change Theme</MDBBtn>}
          {showButton == false &&<CsvDownloadButton/>}

          </Form>
</Container>
<Container>
{expenses.length > 0 ? (
  Object.keys(expenses[0] ?? {}).map(id => (
    <Expense key={id} id={id} expense={expenses[0][id]} editExpense={editExpense} getExpenses={getExpenses} />
  ))
) : (
  <p>No expenses found.</p>
)}

</Container>
    </React.Fragment>
)

}



export default ExpenseTracker;