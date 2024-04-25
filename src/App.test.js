import { fireEvent , render, screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import {Child} from './Components/Child';
import App from './App';
import axios from 'axios';

jest.mock('axios');


const add = (a,b)=> a+b;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('render-snapshot', ()=> {
 const tree=  render(<App/>);
  expect(tree).toMatchSnapshot();
})


describe('Child Component', () => {
  test('renders Child Component', () => {
    render(<Child />);
    const element = screen.getByText(/Child Component/i);
    expect(element).toBeInTheDocument();
  });

  test('render-async', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Child />);
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1); // Changed from `not.toHaveLength(5)` since we're expecting one item
  });

  test('hover', () => {
    render(<Child />);
    const pElement = screen.getByText(/Child Component/i);
    expect(pElement).toBeInTheDocument(); // Assert that the initial text is 'Child Component'

    const buttonElem = screen.getByRole('button')
    expect(buttonElem).toBeInTheDocument()
    // Simulate mouse over event
    fireEvent.mouseOver(buttonElem);

    expect(screen.getByText(/Hovered-Component/i)).toBeInTheDocument();
    // Simulate mouse out event
    fireEvent.mouseOut(buttonElem);
    fireEvent.mouseOver(buttonElem);
    expect(screen.getByText(/Child Component/i)).toBeInTheDocument(); 
  });

  
  test('test-axios', async ()=> {
    axios.get.mockResolvedValueOnce({
      userId: '1',
      id: 'niteesh'
    });

    fireEvent.click(screen.getByText(/Mouse over me/i));
    await awaitfor(()=> {
      screen.findAllByRole('listitem');
      expect(items).toHaveLength(1);
    })
  });


  });
