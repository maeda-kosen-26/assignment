// // API設定
// const API_CONFIG = {
//     baseURL: 'https://llm-education-proxy.vercel.app', // 教員から伝えられたAPI URLに変更
//     studentId: 'student_26', // 各自の学生IDに変更

//     // APIリクエストのデフォルト設定
//     defaultOptions: {
//         temperature: 1.2,
//         max_tokens: 500
//     }
// };

// // 設定をエクスポート（他のファイルから使えるようにする）
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = API_CONFIG;
// }
// API設定（ブラウザ用）
window.API_CONFIG = {
    baseURL: 'https://llm-education-proxy.vercel.app', // 教員から伝えられたAPI URLに変更
    studentId: 'student_26', // 各自の学生IDに変更

    // APIリクエストのデフォルト設定
    defaultOptions: {
        temperature: 1.2,
        max_tokens: 500
    }
};