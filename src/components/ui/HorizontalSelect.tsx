import React, {useState} from 'react';
import {ChevronRight, ChevronLeft} from 'lucide-react';

interface Item {
    id: number;
    name: string;
    image: string;
}

interface HorizontalSelectorProps {
    items: Item[];
    onValueChange: (selectedItem: string) => void;
}

const HorizontalSelector: React.FC<HorizontalSelectorProps> = ({ items, onValueChange }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handlePrevClick = () => {
        const newIndex = (selectedItemIndex - 1 + items.length) % items.length;
        setSelectedItemIndex(newIndex);
        onValueChange(items[newIndex].name);
        console.log("handlePrevClick");
    };

    const handleNextClick = () => {
        const newIndex = (selectedItemIndex + 1) % items.length;
        setSelectedItemIndex(newIndex);
        onValueChange(items[newIndex].name);
        console.log("handleNextClick");
    };

    const handleItemSelected = (item: Item) => {
        const newIndex = items.indexOf(item);
        setSelectedItemIndex(newIndex);
        onValueChange(item.name);
        console.log("handleItemSelected");
    };

    return (
        <div className="flex items-center">
            <button onClick={handlePrevClick} className="px-2 py-1 ml-2 bg-transparent">
                <ChevronLeft />
            </button>
            <div className="flex items-center overflow-hidden">
                {[-1, 0, 1].map((offset) => {
                    const index = (selectedItemIndex + offset + items.length) % items.length;
                    const isSelected = offset === 0;

                    return (
                        <div
                            key={items[index].id}
                            className={`${
                                isSelected ? 'z-10 transform scale-125' : 'z-0 translate-x-4'
                            } transition-all duration-300 ease-in-out`}
                            style={{
                                marginLeft: offset === -1 ? '-2rem' : '0',
                                marginRight: offset === 1 ? '-2rem' : '0',
                                flex: '1 0 33%',
                                filter: isSelected ? 'none' : 'blur(2px)',
                            }}
                        >
                            <img
                                src={items[index].image}
                                alt={items[index].name}
                                className={`w-32 h-32 object-cover rounded-lg ${
                                    isSelected ? 'opacity-100' : 'opacity-50'
                                }`}
                                onClick={() => handleItemSelected(items[index])}
                            />
                            <p className="text-center">{items[index].name}</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleNextClick} className="px-2 py-1 ml-2 bg-transparent">
                <ChevronRight />
            </button>
        </div>
    );
};

export default HorizontalSelector;
