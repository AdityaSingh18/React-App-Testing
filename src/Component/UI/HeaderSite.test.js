import HeaderSite from "./HeaderSite";
import { render,screen } from "@testing-library/react";

describe('Header',()=>{
    test('Testing the Header of Website',()=>{

        //Arrange
    render(<HeaderSite/>)
    
    //Act
    //..notthing
    
    
    //assert
    const TitleElement = screen.getByText('Expense Tracker');
    expect(TitleElement).toBeInTheDocument
    
    })
})
