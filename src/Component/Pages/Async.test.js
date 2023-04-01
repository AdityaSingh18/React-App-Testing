import {render,screen} from '@testing-library/react';
import ExpenseTracker from './ExpenseTracker';

describe('Async component',()=>{
test('renders posts if request succeeds',async()=>{
    window.fetch= jest.fn();
    window.fetch.mockResolvedValueOnce({
        JSON:async()=>[{id:'p1',title:'First Post'} ]
    });
    render(<ExpenseTracker/>)

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
})

})