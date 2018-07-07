/* Local Data Source */

const dataSource = {
    lists: [
        {
            title: "Groceries",
            date: "07/01/18",
            time: "10:48 AM",
            groceries: {
                other: [
                    {
                        item: "Item 1",
                        desc: "dummy text",
                        quant: 99,
                        unit: "gallons",
                        marked: false,
                    }
                ]
            }
        },
        {
            title: "Small Stuff",
            date: "06/27/18",
            time: "7:23 PM",
            groceries: {
                other: [
                    {
                        item: "Item 1",
                        desc: "dummy text",
                        quant: 99,
                        unit: "gallons",
                        marked: false,
                    }
                ]
            }
        },
        {
            title: "Publix Grocery List",
            date: "11/09/17",
            time: "9:04 PM",
            groceries: {
                beverages: [
                    {
                        item: "Soda",
                        desc: "Diet Coca-Cola",
                        quant: 12,
                        unit: "cans",
                        marked: false,
                    },
                    {
                        item: "Juice",
                        desc: "Sunny D",
                        quant: 2,
                        unit: "liters",
                        marked: false,
                    }
                ],
                bakery: [
                    {
                        item: "Bread",
                        desc: "French Baguette",
                        quant: 1,
                        unit: "loaf",
                        marked: false
                    },
                    {
                        item: "Donuts",
                        desc: "Glazed",
                        quant: 2,
                        unit: "dozen",
                        marked: false
                    }
                ],
                dairy: [
                    {
                        item: "Milk",
                        desc: "Whole",
                        quant: 1,
                        unit: "gallon",
                        marked: true
                    },
                    {
                        item: "Eggs",
                        desc: "Extra-Large Brown",
                        quant: 1,
                        unit: "dozen",
                        marked: false
                    },
                    {
                        item: "Cheese",
                        desc: "Pepperjack",
                        quant: 5,
                        unit: "pounds",
                        marked: false
                    }
                ],
                frozenFood: [
                    {
                        item: "Hot Pockets",
                        desc: "Broccolli and Cheddar",
                        quant: 3,
                        unit: "packs",
                        marked: false
                    },
                    {
                        item: "Frozen Pizza",
                        desc: "Digorno",
                        quant: 1,
                        unit: "pack",
                        marked: false
                    }
                ],
            }
        },
    ]
}

export default dataSource