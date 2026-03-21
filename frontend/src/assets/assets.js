
import cse1 from './cse1.png'
import cse2 from './cse2.png'
import cse3 from './cse3.png'
import ece1 from './ece1.png'
import ece2 from './ece2.png'

import logo from './wearova_logo.png'
import ce_banner from './CE T SHIRT BANNER.svg'
import cse_banner from './CSE T SHIRT BANNER.svg'
import ece_banner from './ECE T SHIRT BANNER.svg'
import ee_banner from './EE T SHIRT BANNER.svg'
import me_banner from './ME T SHIRT BANNER.svg'
import new_logo from './NEW CGEC STORE LOGO.svg'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    new_logo,
    ce_banner,
    cse_banner,
    ece_banner,
    ee_banner,
    me_banner,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    {
        _id: "cse001",
        name: "CSE Departmental T-shirt",
        description: "Official CSE department wearable. A premium quality round-neck T-shirt representing the Computer Science & Engineering department of CGEC.",
        price: 499,
        image: [cse1, cse2, cse3],
        category: "Men",
        subCategory: "CSE",
        department: "CSE",
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: 1716634345448,
        bestseller: true,
        discount: 10
    },
    {
        _id: "ece001",
        name: "ECE Departmental T-shirt",
        description: "Official ECE department wearable. A premium quality round-neck T-shirt representing the Electronics & Communication Engineering department of CGEC.",
        price: 499,
        image: [ece1, ece2],
        category: "Men",
        subCategory: "ECE",
        department: "ECE",
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: 1716634345449,
        bestseller: false,
        discount: 10
    }
]