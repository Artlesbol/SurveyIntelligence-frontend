export default {
    methods: {
        /**
         * 取出小括号内的内容
         * @param text
         * @returns {string}
         */
        getParenthesesStr(text) {
            var re = /\((.+?)\)/g;
            text = text.match(re)[0];
            text = text.substring(1,text.length-1);  //ddsdd
            return text;
        },
        /**
         * 取出小括号%内的内容 ... 1(100%) -> 100
         * @param text
         * @returns {string}
         */
        getStrClear(text) {
            try {
                var re = /\((.+?)\)/g;
                var match = text.match(re);
                if (!match || match.length === 0) return text;
                var t = match[0];
                t = t.substring(1, t.length - 1);
                return t.endsWith('%') ? t.substr(0, t.length - 1) : t;
            } catch (e) {
                console.error("Error parsing text:", text, e);
                return text;
            }
        },
        /**
         * 字符串到数字序列的映射
         * @param text len
         * @return {array}
         */
        str2Array(text, len) {
            const str = text + "zewancc-wenjuanxingqiu-huangzehuan";
            var strList = str.split('');
            for (var i=0; i<strList.length; i++)
                strList[i] = strList[i].charCodeAt(0)%len;
            return Array.from(new Set(strList));
        }
    }
}