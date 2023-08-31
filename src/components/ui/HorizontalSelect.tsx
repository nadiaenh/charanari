import React, {useState} from 'react';

interface Item {
    id: number;
    name: string;
    image: string;
}

interface HorizontalSelectorProps {
    items: Item[];
    onValueChange: (selectedItem: Item) => void;
}

const HorizontalSelector: React.FC<HorizontalSelectorProps> = ({items, onValueChange}) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handlePrevClick = () => {
        setSelectedItemIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        onValueChange(items[(selectedItemIndex - 1 + items.length) % items.length]);
    };

    const handleNextClick = () => {
        setSelectedItemIndex((prevIndex) => (prevIndex + 1) % items.length);
        onValueChange(items[(selectedItemIndex + 1 + items.length) % items.length]);
    };

    const handleItemSelected = (item: Item) => {
        setSelectedItemIndex(items.indexOf(item));
        onValueChange(item);
    };

    return (
        <div className="flex items-center">
            <button onClick={handlePrevClick} className="px-2 py-1 mr-2 rounded-md bg-gray-200">
                &lt;
            </button>
            <div className="flex items-center space-x-4 overflow-hidden">
                {[-1, 0, 1].map((offset) => {
                    const index = (selectedItemIndex + offset + items.length) % items.length;

                    return (
                        <div
                            key={items[index].id}
                            className={`${
                                offset === 0 ? 'z-10 transform scale-125' : 'z-0 translate-x-4'
                            } transition-all duration-300 ease-in-out`}
                            style={{
                                marginLeft: offset === -1 ? '-2rem' : '0',
                                marginRight: offset === 1 ? '-2rem' : '0',
                            }}
                        >
                            <img
                                src={items[index].image}
                                alt={items[index].name}
                                className={`w-32 h-32 object-cover rounded-lg ${
                                    offset === 0 ? 'opacity-100' : 'opacity-50'
                                }`}
                                onClick={() => handleItemSelected(items[index])}
                            />
                            <p className="text-center">{items[index].name}</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleNextClick} className="px-2 py-1 ml-2 rounded-md bg-gray-200">
                &gt;
            </button>
        </div>
    );
};

export default HorizontalSelector;
