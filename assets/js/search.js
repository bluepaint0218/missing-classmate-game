// assets/js/search.js
// 统一处理：去空格、全小写（中文基本不受影响）
function normalizeQuery(q) {
    if (!q) return "";
    return q.trim().toLowerCase();
}

/**
 * 配置：每条规则包含：
 *  - keys: 触发这个规则的一组关键词（包含任意一个即可）
 *  - urls: 找到后应该出现的页面列表（相对路径）
 */
const SEARCH_CONFIG = [
    // 学习压力线：日记、学习记录等
    {
        keys: ["月考", "考试", "成绩单", "作业", "压力"],
        urls: ["externaldata/diary/diary_study.html"]
    },
    // 社交线：班级群聊天、操场照片
    {
        keys: ["群聊", "聊天", "朋友", "吵架", "孤单"],
        urls: [
            "externaldata/chat/chat_group.html",
            "externaldata/misc/photo_playground.html"
        ]
    },
    // 家庭线：家长短信、班级通知
    {
        keys: ["家长", "父母", "短信", "吵架", "期待"],
        urls: [
            "externaldata/news/class_notice.html",
            "externaldata/diary/diary_social.html"
        ]
    },
    // 校园传闻线：旧教学楼、监控图
    {
        keys: ["旧教学楼", "传闻", "影子", "怪谈", "黑影"],
        urls: [
            "externaldata/school/rumor_old_building.html",
            "externaldata/misc/photo_monitor.html"
        ]
    },
    // 情绪线：情绪崩溃前夜日记
    {
        keys: ["情绪", "崩溃", "难受", "撑不住", "求助"],
        urls: ["externaldata/diary/diary_emotion.html"]
    },
    // 座位表 / 学号线：决定账号里的“8315”
    {
        keys: ["座位表", "座位", "座位图", "教室", "调座"],
        urls: ["externaldata/school/seat_map.html"]
    },
    // 校园系统登录说明：告诉“账号 = 年级 + 班级 + 座位号”
    {
        keys: ["校园网", "系统", "账号", "学号", "登录说明"],
        urls: ["externaldata/school/campus_login_help.html"]
    },
    // 生日聊天：确定生日是 2 月 18 日
    {
        keys: ["生日", "蛋糕", "聚会", "庆生"],
        urls: ["externaldata/chat/chat_birthday.html"]
    },
    // 体检 / 心理筛查：确定出生年份 2010 年
    {
        keys: ["体检", "健康", "心理筛查", "问卷"],
        urls: ["externaldata/news/health_check.html"]
    },
    // 直接指向登录界面（最后谜题）
    {
        keys: ["登录", "login", "系统入口"],
        urls: ["login.html"]
    }
];

/**
 * 主函数：根据输入的 query 返回一个“可能相关页面列表”
 * @param {string} rawQuery 用户原始输入
 * @returns {string[]} 匹配到的相对路径数组
 */
function searchByQuery(rawQuery) {
    const q = normalizeQuery(rawQuery);
    const results = [];

    if (!q) return results;

    SEARCH_CONFIG.forEach(rule => {
        rule.keys.forEach(key => {
            const keyNorm = key.toLowerCase();
            if (q.includes(keyNorm)) {
                rule.urls.forEach(url => {
                    if (!results.includes(url)) {
                        results.push(url);
                    }
                });
            }
        });
    });

    return results;
}
