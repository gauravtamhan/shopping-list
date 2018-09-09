/* Local Data Source */

const dataSource = {
    lists: [
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

// var groceries = [
//     {
//         item: "Soda",
//         quant: 12,
//         unit: "cans",
//         marked: false,
//         category: 'Beverages'
//     },
//     {
//         item: "Juice",
//         quant: 2,
//         unit: "liters",
//         marked: false,
//         category: 'Beverages'
//     },
//     {
//         item: "Bread",
//         quant: 1,
//         unit: "loaf",
//         marked: false,
//         category: 'Bakery'
//     },
//     {
//         item: "Milk",
//         quant: 2,
//         unit: "gallons",
//         marked: false,
//         category: 'Dairy'
//     },
//     {
//         item: "Cake",
//         quant: 2,
//         unit: "boxes",
//         marked: false,
//         category: 'Bakery'
//     }
// ]

// var output = [
//     {
//         title: 'Beverages', 
//         data: [
//             {
//                 item: "Soda",
//                 quant: 12,
//                 unit: "cans",
//                 marked: false,
//                 category: 'Beverages'
//             },
//             {
//                 item: "Juice",
//                 quant: 2,
//                 unit: "liters",
//                 marked: false,
//                 category: 'Beverages'
//             }
//         ]
//     },
//     {
//         title: 'Bakery',
//         data: [
//             {
//                 item: "Bread",
//                 quant: 1,
//                 unit: "loaf",
//                 marked: false,
//                 category: 'Bakery'
//             },
//             {
//                 item: "Cake",
//                 quant: 2,
//                 unit: "boxes",
//                 marked: false,
//                 category: 'Bakery'
//             }
//         ]
//     },
//     {
//         title: 'Dairy',
//         data: [
//             {
//                 item: "Milk",
//                 quant: 2,
//                 unit: "gallons",
//                 marked: false,
//                 category: 'Dairy'
//             },
//         ]
//     },
// ]