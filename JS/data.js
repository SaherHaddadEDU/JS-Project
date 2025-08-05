"use strict";
//#region Contacts
// הגדרת מערך של אנשי קשר – כל איש קשר הוא אובייקט עם פרטים אישיים,
// כולל היסטוריית עדכונים (updates) לצורך מעקב על שינויים.
const contacts =
    [
        {
            image: "./IMG/Anna.jpg",
            fullName: "Anna Bannana",
            age: 21,
            phone: "0558496322",
            email: "Ann959@gmail.com",
            address: "Tel-Aviv",
            notes: "",
            group: "",
            isFavorite: false,
            updates: []
        },
        {
            image: "https://scontent.ftlv6-1.fna.fbcdn.net/v/t39.30808-1/489225020_2048874075632474_6577772289893890330_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=epJ1oq_lxFIQ7kNvwHL3nu9&_nc_oc=AdnG4g5DHSwWv3LLscCAS99MdmsbN06teJ0UsK64OpcxwS74WZx2yJc_EOThVM7tF-aQ0uyVjq6nFrk8doq3JkZy&_nc_zt=24&_nc_ht=scontent.ftlv6-1.fna&_nc_gid=DP0dwG7IXsbZqhLVRy_ODw&oh=00_AfQngIvcDfoeqvi0yhJZ0y2JUKoPCnqrYZXUIH_rNJKD9A&oe=689514EE",
            fullName: "Igor Nikonov",
            age: 27,
            phone: "0547730575",
            email: "igornikon2901@gmail.com",
            address: "Kiryat-Yam Shapira",
            notes: "Bike rider and climber",
            group: "",
            isFavorite: false,
            updates: []
        },
        {
            image: "./IMG/joe.jpg",
            fullName: "Joe Speen",
            age: 29,
            phone: "0546689710",
            email: "joe123@walla.com",
            address: "Nesher",
            notes: "",
            group: "",
            isFavorite: false,
            updates: []
        },
        {
            image: "./IMG/Mai.jpg",
            fullName: "Mai Yates",
            age: 25,
            phone: "0548265154",
            email: "mayt@gmail.com",
            address: "Haifa",
            notes: "",
            group: "",
            isFavorite: false,
            updates: []
        },
        {
            image: "./IMG/Lior.avif",
            fullName: "Lior Itovich",
            age: 27,
            phone: "0546649117",
            email: "itovich@gmail.com",
            address: "Kiryat Haim",
            notes: "Love to play video games",
            group: "Friend",
            isFavorite: true,
            updates: []
        },
        {
            image: "./IMG/Mice.jpg",
            fullName: "Mickey Mouse",
            age: 35,
            phone: "0566666666",
            email: "MMM@yahoo.com",
            address: "21 JumpStreet",
            notes: "Leader of the MMM",
            group: "Work",
            isFavorite: true,
            updates: []
        },
        {
            image: "./IMG/Vlad.jpg",
            fullName: "Vlad Pupkin",
            age: 43,
            phone: "0551596321",
            email: "pupVlad@mail.ru",
            address: "Tel-Baruch",
            notes: "Love my Tatiana <3",
            group: "Family",
            isFavorite: false,
            updates: []
        },
        {
            image: "./IMG/Tatiana.jpg",
            fullName: "Tatiana Pupkina",
            age: 10,
            phone: "0551569123",
            email: "yanP@mail.ru",
            address: "Tel-Baruch",
            notes: "Love my vladik <3",
            group: "Family",
            isFavorite: false,
            updates: []
        }];
//#endregion