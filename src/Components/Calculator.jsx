import {useState, useEffect} from 'react'
import divide from '../img/divide.png'
import minus from '../img/minus.png'
import cross from '../img/cross.png'
import plus from '../img/plus.png'
import equal from '../img/equal.png'


const Calculator = () => {
    const width = 430 * 0.73;
    const height = 932 * 0.73;

    const [display, setDisplay] = useState(''); // to handle display value
    const [currValue, setCurrValue] = useState(''); // to handle input
    const [operator, setOperator] = useState(null); // handling operator
    const [prevValue, setPrevValue] = useState(null); // to save previous number

    // to handle the mouse button click
    const handleButtonClick = (value)=> {
        if(!isNaN(value) || value === '.') {    // Check if the input is number of decimal
            setCurrValue(currValue + value);
            setDisplay(display + value);
        } else if(value === 'AC') {
            resetCalculator();
        } else if(value === '+/-') {
            setCurrValue((parseFloat(currValue) * -1).toString());
            setDisplay((parseFloat(currValue) * -1).toString());
        } else if(value === '%') {
            setCurrValue((parseFloat(currValue) / 100).toString());
            setDisplay((parseFloat(currValue) / 100).toString());            
        } else if(value === '=') {
            calculateResult();
        } else {
            setOperator(value);
            setPrevValue(parseFloat(currValue));
            setCurrValue('');
            setDisplay(display + '' + value + ' ');
        }
    };

    // to handle the key press from keyboard
    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            if(!isNaN(key) || key === '.') {
                handleButtonClick(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                handleButtonClick(key);
            } else if(key === 'Enter') {
                calculateResult();
            } else if(key === 'Escape') {
                resetCalculator();
            }
        };

        document.addEventListener('keypress', handleKeyPress);
        return() => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [currValue, display]);

    // calculate function
    const calculateResult = () => {
        const curr = parseFloat(currValue);
        const prev = prevValue;

        if(operator && !isNaN(curr) && !isNaN(prev)) {
            let result;

            switch(operator) {
                case '+':
                    result = prev + curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '*':
                    result = curr * prev;
                    break;
                case '/':
                    result = curr !== 0 ? prev / curr : 'Error';
                    break;
                default:
                    return;
            }

            setDisplay(String(result));
            setCurrValue(String(value));
            setOperator(null);
            setPrevValue(null);
        }
    };

    // reset calculator if AC is clicked
    const resetCalculator = () => {
        setDisplay('');
        setCurrValue('');
        setOperator(null);
        setPrevValue(null);
    }


    return(
        <div id='outer-border' className='border-4 border-gray-800 p-2 rounded-3xl'>
            <div id='innner-border' className='border-4 border-gray-800 rounded-2xl'>
                <div id='screen' style={{width: `${width}px`, height: `${height}px`}} className='rounded-xl bg-gray-50 p-4 bg-[#F5F5DC]'>
                    <div
                        id="display"
                        className="text-right text-3xl bg-[#fbf7e3] p-4 rounded-lg mb-4 w-full h-44 border-2 border-[#D2B48C] outline-none"
                        style={{ color: '#333' }}
                    >
                        {display || '0'}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['AC', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(btn)}
                                className={`text-2xl p-6 rounded-full flex items-center justify-center ${
                                    btn === '=' || btn === '+' || btn === '-' || btn === '*' || btn === '/'
                                        ? 'bg-[#FF8500] text-[#F5F5F5]'
                                        : btn === 'AC' || btn === '+/-' || btn === '%'
                                        ? 'bg-[#D2B48C] text-[#242424]'
                                        : 'bg-[#242424] text-[#F5F5F5]'
                                } ${btn === '0' ? 'col-span-2 rounded-lg' : ''}`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;