"use strict";
layui.define(["okUtils"], function (exprots) {
    let okUtils = layui.okUtils;

    var okHoliday = {
        getContent: function () {
            let dateStr = okUtils.dateFormat(new Date(), "yyyy-MM-dd");
            let content = dateStr;
            return content;
        }
    }

    exprots("okHoliday", okHoliday);
});
