import React, {useState} from 'react';

interface Item {
    id: number;
    name: string;
    image: string;
}

const items: Item[] = [
    {
        id: 1,
        name: 'Item 1',
        image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg'
    },
    {
        id: 2,
        name: 'Item 2',
        image: 'https://static.vecteezy.com/system/resources/previews/005/634/168/original/strawberry-icon-isolated-on-white-illustration-free-vector.jpg'
    },
    {
        id: 3,
        name: 'Item 3',
        image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg'
    },
    {
        id: 4,
        name: 'Item 4',
        image: 'https://static.vecteezy.com/system/resources/previews/005/634/168/original/strawberry-icon-isolated-on-white-illustration-free-vector.jpg'
    },
];

const HorizontalSelector: React.FC = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handlePrevClick = () => {
        setSelectedItemIndex((prevIndex) =>
            (prevIndex - 1 + items.length) % items.length
        );
    };

    const handleNextClick = () => {
        setSelectedItemIndex((prevIndex) =>
            (prevIndex + 1) % items.length
        );
    };

    return (
        <div className="flex items-center">
            <button
                onClick={handlePrevClick}
                className="px-2 py-1 mr-2 rounded-md bg-gray-200"
            >
                &lt;
            </button>
            <div className="flex items-center space-x-4 overflow-hidden">
                {[-1, 0, 1].map((offset) => {
                    const index = (selectedItemIndex + offset + items.length) % items.length;
                    return (
                        <div
                            key={items[index].id}
                            className={`${
                                offset === 0
                                    ? 'z-10 transform scale-125'
                                    : 'z-0 translate-x-4'
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
                            />
                            <p className="text-center">{items[index].name}</p>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={handleNextClick}
                className="px-2 py-1 ml-2 rounded-md bg-gray-200"
            >
                &gt;
            </button>
        </div>
    );
};

export default HorizontalSelector;
