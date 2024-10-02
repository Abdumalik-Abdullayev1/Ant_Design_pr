import {
    ProductOutlined,
    AppstoreOutlined,
    AppstoreAddOutlined,
    SettingOutlined,
    StockOutlined,
} from '@ant-design/icons';

const user = [
    {
        content: "Products",
        path: "/user-layout",
        icon: <ProductOutlined/>
    },
    {
        content: "Categories",
        path: "/user-layout/categories",
        icon: <AppstoreOutlined/>
    },
    {
        content: "Brands",
        path: "/user-layout/brand",
        icon: <AppstoreOutlined/>
    },
    {
        content: "Brand category",
        path: "/user-layout/brand-category",
        icon: <AppstoreAddOutlined/>
    },
    {
        content: "Ads",
        path: "/user-layout",
        icon: <StockOutlined/>
    },
    {
        content: "Settings",
        path: "/user-layout",
        icon: <SettingOutlined/>
    },
]

export { user }