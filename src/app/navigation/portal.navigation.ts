import { FuseNavigation } from '@fuse/types';

let isAdmin = false; 
if(localStorage.getItem('role') == 'Admin'){

    isAdmin = true; 
}

console.log(isAdmin); 

export const portalNavigation: FuseNavigation[] = [
   
    {
        id       : 'applications',
        title    : 'Menus',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [

            //===================================>> Dashboard
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'Dashboard',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard',
                children : [],
            }, 

            //===================================>> POS
            {
                id       : 'pos',
                title    : 'POS',
                translate: 'POS',
                type     : 'item',
                icon     : 'desktop_mac',
                url      : '/pos',
                children : [],
            }, 

             //===================================>> Sale
             {
                id       : 'sale',
                title    : 'Sales',
                translate: 'Sales',
                type     : 'item',
                icon     : 'shopping_cart',
                url      : '/sales',
                children : [],
            }, 

            //===================================>> Branch
            {
                id       : 'branch',
                title    : 'សាខា',
                translate: 'សាខា',
                type     : 'item',
                icon     : 'store',
                url      : '/branches',
                hidden   : !isAdmin,
                children : [],
            }, 

            //===================================>> Product
            {
                id       : 'product',
                title    : 'Product',
                translate: 'Product',
                type     : 'collapsable',
                icon     : 'shop_two',
                hidden   : !isAdmin,
                children : [
                    {
                        id       : 'all-product',
                        title    : 'All Products',
                        translate: 'All Products',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/products'
                    }, 
                    {
                        id      : 'product-type',
                        title   : 'Type',
                        translate: 'Type',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/product-types'
                    }
                ],
            },

           
            //===================================>> Expense
            {
                id       : 'expense',
                title    : 'Expense',
                translate: 'Expense',
                type     : 'collapsable',
                icon     : 'monetization_on',
                hidden   : !isAdmin,
                children : [
                    {
                        id       : 'all-expense',
                        title    : 'All Expense',
                        translate: 'All Expense',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/expenses'
                    }, 
                    {
                        id      : 'expense-type',
                        title   : 'Type',
                        translate: 'Type',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/expense-types'
                    }
                ],
            },

            //===================================>> Expense
            {
                id       : 'income',
                title    : 'Income',
                translate: 'Income',
                type     : 'collapsable',
                icon     : 'monetization_on',
                hidden   : !isAdmin,
                children : [
                    {
                        id       : 'all_income',
                        title    : 'All Income',
                        translate: 'All Income',
                        type     : 'item',
                        icon     : 'keyboard_arrow_right',
                        url      : '/income'
                    }, 
                    {
                        id      : 'income-type',
                        title   : 'Type',
                        translate: 'Type',
                        type    : 'item',
                        icon     : 'keyboard_arrow_right',
                        url     : '/income-types'
                    }
                ],
            },

            //===================================>> Supplier
            {
                id       : 'Supplier',
                title    : 'Supplier',
                translate: 'Supplier',
                type     : 'item',
                icon     : 'group',
                url      : '/supplier',
                hidden   : !isAdmin
            },
             //===================================>> Customer
             {
                id       : 'Customer',
                title    : 'Customer',
                translate: 'Customer',
                type     : 'item',
                icon     : 'group',
                url      : '/customer',
                hidden   : !isAdmin
            },
            //===================================>> User
            {
                id       : 'user',
                title    : 'User',
                translate: 'User',
                type     : 'item',
                icon     : 'group',
                url      : '/users',
                hidden   : !isAdmin
            },

            //===================================>> My Profile
            {
                id       : 'profile',
                title    : 'Profile',
                translate: 'Profile',
                type     : 'item',
                icon     : 'person',
                url      : '/profile'
            },
    
        ],
    },

    
    
];
