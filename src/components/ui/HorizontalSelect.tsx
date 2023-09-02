//

import React, {useState} from 'react';
import {ChevronRight, ChevronLeft} from 'lucide-react';

interface Item {
    id: string;
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
        onValueChange(items![newIndex]!.name);
    };

    const handleNextClick = () => {
        const newIndex = (selectedItemIndex + 1) % items.length;
        setSelectedItemIndex(newIndex);
        onValueChange(items![newIndex]!.name);
    };

    const handleItemSelected = (item: Item) => {
        const newIndex = items.indexOf(item);
        setSelectedItemIndex(newIndex);
        onValueChange(item.name);
    };

    return (
        <div id="selectorContainer" className="flex items-center">
            <button type="button" onClick={handlePrevClick} className="px-2 py-1 ml-2 bg-transparent">
                <ChevronLeft />
            </button>
            <div id="itemContainer" className="flex items-center overflow-hidden">
                {[-1, 0, 1].map((offset) => {
                    const index = (selectedItemIndex + offset + items.length) % items.length;
                    const isSelected = offset === 0;

                    return (
                        <div
                            id="imageContainer"
                            key={items![index]!.id}
                            className={`${
                                isSelected ? 'z-10 transform scale-125' : 'z-0 translate-x-4'
                            } transition-all duration-300 ease-in-out py-6`}
                            style={{
                                marginLeft: offset === -1 ? '-2rem' : '0',
                                marginRight: offset === 1 ? '-2rem' : '0',
                                flex: '1 0 33%',
                                filter: isSelected ? 'none' : 'blur(2px)',
                            }}
                        >
                            <img
                                src={items![index]!.image}
                                alt={items![index]!.name}
                                className={`w-36 h-36 object-cover rounded-xl shadow-xl ${
                                    isSelected ? 'opacity-100 border border-black' : 'opacity-50'
                                }`}
                                onClick={() => handleItemSelected(items![index]!)}
                            />
                            <p className="text-center">{items![index]!.name}</p>
                        </div>
                    );
                })}
            </div>
            <button type="button" onClick={handleNextClick} className="px-2 py-1 ml-2 bg-transparent">
                <ChevronRight />
            </button>
        </div>
    );
};

export default HorizontalSelector;
